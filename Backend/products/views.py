import uuid
from attr import validate
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ParseError

from django.shortcuts import get_list_or_404, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.core.cache import cache
from django.http import Http404, HttpResponseBadRequest

from utils.validate_uuid import valid_uuid
from utils.related_product import related_products

from products import serializers, filters
from products.models import Product
from visitors.models import UserAgent, Visitor
from products.permissions import IsOwner

class ProductApiView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

class ProductDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner | permissions.IsAdminUser]

class ProductWatchView(generics.GenericAPIView):
    """ Path 'product/watch?pid=<int>'
    """
    queryset = Product.objects.all()
    filter_backends = [filters.QProductWithParam]
    search_fields = ['=id']

    def get_ip_useragent(self, request):
        user_agent = request.META.get('HTTP_USER_AGENT', None)
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')

        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[-1].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')

        return ip, user_agent
    
    def get_cookie(self, request):
        return request.COOKIES.get('pidx_session_id')

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        cookie = self.get_cookie(request)

        if not queryset or not valid_uuid(cookie):
            raise ParseError("Invalid request.")

        ip, user_agent = self.get_ip_useragent(request)
        user = request.user if isinstance(request.user, User) else None
        ctype = ContentType.objects.get(app_label='products', model='product')
        count = Visitor.objects.get_in_last(queryset, ip, minutes=5).count() # type: ignore

        if not count:
            agentModel, _ = UserAgent.objects.get_or_create(user_agent=user_agent)
            visitModel = Visitor(ip_addr=ip, content_type=ctype, cookie=cookie, object_id=queryset.id, user=user, user_agent=agentModel)
            visitModel.save()

        return Response(status=200)

class RecommendedProductAPIView(generics.ListAPIView):
    queryset = Visitor.objects
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        cookie_product = self.request.COOKIES.get('pidx_session_id')
        if not valid_uuid(cookie_product):
            raise ParseError("Invalid request.")

        visit = get_list_or_404(self.queryset, cookie=cookie_product)[-1]
        product = visit.content_obj
        products = related_products(product.id)

        if not products:
            raise Http404("No related products found.")
        
        qs = Product.objects.filter(id__in=products).order_by('?')
        return qs

class RelatedProductView(generics.ListAPIView):
    queryset = Product.objects
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        default_count = 10
        start = 0
        pid = self.kwargs['pk']
        page = int(self.request.query_params.get('page', 1)) # type: ignore

        if page:
            start = int((page - 1) * default_count)
            default_count = int(page*default_count)
        
        qs = cache.get(f"related_products_{pid}")
        product = get_object_or_404(self.queryset, id=pid)
        
        products = related_products(product.id, start, default_count)
        if not qs:
            if not products:
                raise Http404("No related products found.")
            
            qs = self.queryset.filter(id__in=products).order_by('?')
            # cache.set(f"related_products_{pid}", qs, timeout=60*15) # 15 minutes

        return qs
    

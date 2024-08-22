from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.cache import cache
from django.http import Http404
from sympy import per
from utils.recommender import related_products

from products import serializers, filters
from products.models import Product
from visitors.models import UserAgent, Visitor

class ProductApiView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class ProductDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, permissions.IsAdminUser]

class ProductWatchView(generics.GenericAPIView):
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

    def get(self, request,*args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if not queryset:
            return Response(status=400)

        ip, user_agent = self.get_ip_useragent(request)
        user = isinstance(request.user, User) or None
        count = queryset.visitor.get_in_last(minutes=5).count()

        if not count:
            agentModel, _ = UserAgent.objects.get_or_create(user_agent=user_agent)
            visitModel = Visitor(ip_addr=ip, product=queryset, user=user, user_agent=agentModel)
            visitModel.save()
            queryset.visitor.add(visitModel)

        return Response(status=200)

class RelatedProductView(generics.ListAPIView):
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        default_count = 10
        start = 0
        pid = self.kwargs['pk']
        page = int(self.request.query_params.get('page', 1))

        if page:
            start = int((page - 1) * default_count)
            default_count = int(page*default_count)
        
        qs = cache.get(f"related_products_{pid}")
        product = Product.objects.filter(id=pid).first()
        if not product:
            raise Http404("Product not found.")
        
        products = related_products(pid, start, default_count)
        if not qs:
            if not products:
                raise Http404("No related products found.")
            
            qs = Product.objects.filter(id__in=products).order_by('?')
            # cache.set(f"related_products_{pid}", qs, timeout=60*15) # 15 minutes

        return qs
    
    

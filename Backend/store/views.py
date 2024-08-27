from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Store
from .serializers import StoreSerializer, StoreListSerializer
from products.serializers import ProductListSerializer



class StoreAPIView(generics.ListCreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreListSerializer

class StoreProductsAPIView(generics.ListAPIView):
    queryset = Store.objects.all()
    serializer_class = ProductListSerializer

    def get_queryset(self):
        queryset = get_object_or_404(self.queryset, id=self.kwargs['pk'])
        queryset = queryset.products.all()
        return queryset

class StoreDetailAPIView(generics.RetrieveAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
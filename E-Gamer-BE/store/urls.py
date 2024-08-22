from django.urls import path
from .views import StoreAPIView, StoreDetailAPIView, StoreProductsAPIView

urlpatterns = [
    path('', StoreAPIView.as_view(), name='store-list'),
    path('<int:pk>/', StoreDetailAPIView.as_view(), name='store-detail'),
    path('<int:pk>/products/', StoreProductsAPIView.as_view(), name='store-products'),
]
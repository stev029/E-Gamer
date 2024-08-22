from django.urls import include, path

from products import views

urlpatterns = [
    path('', views.ProductApiView.as_view(), name='list-product'),
    path('<int:pk>/', views.ProductDetailApiView.as_view(), name='product-detail'),
    path('watch/', views.ProductWatchView.as_view(), name='watch-product'),
    path('related/<int:pk>/', views.RelatedProductView.as_view(), name='related-product'),
]
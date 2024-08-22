from cgitb import lookup
from pyexpat import model
from rest_framework import serializers
from .models import Store, Address
from products.serializers import ProductSerializer


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ['store', 'id']

class StoreSerializer(serializers.ModelSerializer):
    owner = serializers.CharField()
    addresses = AddressSerializer(many=True)

    class Meta:
        model = Store
        fields = '__all__'

class StoreListSerializer(StoreSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'profile_photo', 'url']
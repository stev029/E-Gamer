from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache

from products.models import Product
from visitors.models import Visitor

@receiver([post_save, post_delete], sender=Product)
def create_product_visitor(sender, instance, created=None, **kwargs):
    cache.delete("dataset_from_database")
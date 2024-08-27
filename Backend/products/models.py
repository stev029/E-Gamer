from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

from utils.images_name import unique_name_image

# Create your models here.

class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=False, blank=False)
    stock = models.IntegerField(null=False, blank=False)
    price = models.IntegerField(null=False, blank=False)
    seller = models.ForeignKey('store.store', on_delete=models.CASCADE, related_name='products')
    game = models.ForeignKey('game', on_delete=models.SET_NULL, related_name='products', blank=True, null=True)
    visitors = GenericRelation('visitors.visitor')

    def __str__(self) -> str:
        return self.title
    
    def get_category(self):
        return self.category.all()
    
    def visitor_count(self):
        return self.visitors.count()

class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=unique_name_image)

    def __str__(self) -> str:
        return self.product.title
    
class Game(models.Model):
    name = models.CharField(max_length=50, unique=True)
    publisher = models.CharField(max_length=50, null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    product = models.ManyToManyField(Product, related_name='tags', null=True, blank=True)

    def __str__(self) -> str:
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    product = models.ManyToManyField(Product, related_name='category')

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name_plural = 'categories'
from django.contrib import admin
from .models import *

# Register your models here.
class CategoriesInline(admin.TabularInline):  # Anda juga bisa menggunakan StackedInline
    model = Product.category.through  # Menggunakan model penghubung M2M secara langsung
    extra = 1  # Jumlah form kosong tambahan untuk penambahan cepat

class TagsInline(admin.TabularInline):  # Anda juga bisa menggunakan StackedInline
    model = Product.tags.through  # Menggunakan model penghubung M2M secara langsung
    extra = 1  # Jumlah form kosong tambahan untuk penambahan cepat

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'stock', 'price', 'seller', 'game')
    readonly_fields = ['visitor_count', 'id']
    inlines = [CategoriesInline, TagsInline]


admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Game)
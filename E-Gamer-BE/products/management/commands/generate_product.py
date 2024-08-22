from math import prod
import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.test import tag
from faker import Faker
from torch import ge, rand
from products.models import Category, Product, Tag

fake = Faker('id_ID')

class Command(BaseCommand):
    help = 'Generate a product'

    def add_arguments(self, parser):
        parser.add_argument("count", nargs='?', default=10, type=int)
        parser.add_argument("--category", action='store_true', default=False)
        parser.add_argument("--tags", action='store_true', default=False)

    def generate_tags(self, products, n=10, **options):
        generate_tag = options.get('tags')
        
        if generate_tag:
            tags = []
            n = random.randint(1, n)
            for i in range(n):
                tags.append(
                    Tag(name=fake.word()),
                )
            tags = Tag.objects.bulk_create(tags, ignore_conflicts=True)
            self.stdout.write(self.style.SUCCESS(f'{len(tags)} Tags created successfully.'))

        for product in products:
            if product.tags.count() > 0:
                continue
            qs = Tag.objects.all()
            qs = [tags[0] for tags in qs.values_list('id')]
            tags = random.sample(qs, random.randint(3,7))
            tags_raw = []
            for tag_id in tags:
                tags_raw.append(Product.tags.through(tag_id=tag_id, product_id=product.id)) # type: ignore
            Product.tags.through.objects.bulk_create(tags_raw, ignore_conflicts=True) # type: ignore
            self.stdout.write(self.style.SUCCESS(f'Tags {tags} created for {product.title} successfully.'))

    def generate_categories(self, products, n=10, **options):
        generate_category = options.get('category')

        if generate_category:
            categories = []
            n = random.randint(1, n)
            for i in range(n):
                categories.append(
                    Category(name=fake.word()),
                )
            categories = Category.objects.bulk_create(categories, ignore_conflicts=True)
            self.stdout.write(self.style.SUCCESS(f'{len(categories)} Categories created successfully.'))

        
        for product in products:
            if product.category.count() > 0:
                continue
            qs = Category.objects.all()
            qs = [category[0] for category in qs.values_list('id')]
            categories = random.sample(qs, random.randint(1,4))
            category_raw = []
            for category_id in categories:
                category_raw.append(Product.category.through(category_id=category_id, product_id=product.id)) # type: ignore
            Product.category.through.objects.bulk_create(category_raw, ignore_conflicts=True) # type: ignore
            self.stdout.write(self.style.SUCCESS(f'Categories {categories} created for {product.title} successfully.'))

    def handle(self, *args, **options):
        products = []
        user = get_user_model().objects.all()
        count = options.get('count', 10)

        for i in range(count):
            products.append(
                Product(
                title=fake.name(),
                description=fake.text(),
                price=fake.random_int(min=10000, max=1000000),
                stock=fake.random_int(min=1, max=100),
                seller=random.choice(user),
            ))
        products = Product.objects.bulk_create(products)
        self.stdout.write(self.style.SUCCESS(f'{len(products)} Product created successfully.'))
        
        # generate categories for each product
        # products = Product.objects.all()
        self.generate_categories(products=products, n=count, **options)
        self.generate_tags(products=products, n=count, **options)
        
        # generate categories for each product
        
        self.stdout.write(self.style.SUCCESS(f'All products created successfully.'))
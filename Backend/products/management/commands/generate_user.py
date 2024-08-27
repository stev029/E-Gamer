from re import U
from django.core.management.base import BaseCommand
from faker import Faker
from products.models import User

class Command(BaseCommand):
    help = 'Generate a user'

    def add_arguments(self, parser):
        parser.add_argument("count", nargs='?', default=10, type=int)

    def handle(self, *args, **options):
        fake = Faker('id_ID')
        users = []
        for i in range(options.get('count')):
            users.append(
                User(
                username=fake.user_name(),
                email=fake.email(),
                password=fake.password(),
            ))
        users = User.objects.bulk_create(users)
        self.stdout.write(self.style.SUCCESS(f'{len(users)} User created successfully.'))
from django.db import models

class Store(models.Model):
    name = models.CharField(max_length=255)
    profile_photo = models.ImageField(upload_to='profile/%Y-%m-%d/', null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='stores')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Address(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='addresses')
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=255)

    def __str__(self):
        return self.address
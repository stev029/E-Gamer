from datetime import timedelta
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AnonymousUser

from visitors.managers import VisitorManager

# Create your models here.
class UserAgent(models.Model):
    user_agent = models.CharField(max_length=255, unique=True)

    def __str__(self) -> str:
        return self.user_agent

class Visitor(models.Model):
    ip_addr = models.GenericIPAddressField(null=True, blank=True)
    product = models.ForeignKey('products.product', on_delete=models.CASCADE, related_name='visitor')
    user = models.ForeignKey('auth.user', on_delete=models.CASCADE, related_name='visitor', null=True, blank=True)
    user_agent = models.ForeignKey('useragent', on_delete=models.CASCADE, related_name='visitor', null=True, blank=True)
    created = models.DateTimeField(editable=False, auto_now_add=True)

    objects = VisitorManager()
    
    @property
    def get_user(self):
        return self.user or AnonymousUser()
    
    def __str__(self):
        return self.ip_addr
from datetime import timedelta
from uuid import uuid4
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AnonymousUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from visitors.managers import VisitorManager

# Create your models here.
class UserAgent(models.Model):
    user_agent = models.CharField(max_length=255, unique=True)

    def __str__(self) -> str:
        return self.user_agent

class Visitor(models.Model):
    ip_addr = models.GenericIPAddressField(null=True, blank=True)
    cookie = models.UUIDField(default=uuid4, null=True, blank=True)
    user = models.ForeignKey('auth.user', on_delete=models.CASCADE, related_name='visitors', null=True, blank=True)
    user_agent = models.ForeignKey('useragent', on_delete=models.CASCADE, related_name='visitors', null=True, blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='visitors')
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_obj = GenericForeignKey('content_type', 'object_id')
    visit_time = models.DateTimeField(auto_now_add=True)

    objects = VisitorManager()
    
    @property
    def get_user(self):
        return self.user or AnonymousUser()
    
    def __str__(self):
        return self.ip_addr
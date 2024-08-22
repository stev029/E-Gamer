from django.contrib import admin

from visitors.models import UserAgent, Visitor

# Register your models here.
admin.site.register(Visitor)
admin.site.register(UserAgent)
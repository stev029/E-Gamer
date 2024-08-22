from datetime import timedelta
from django.db import models
from django.utils import timezone

class VisitorManager(models.Manager):
    def get_in_last(self, **kwargs):
        assert kwargs, "Must provide at least one timedelta arg (eg, days=1)"

        period = timezone.now() - timedelta(**kwargs)
        return self.filter(created__gte=period)
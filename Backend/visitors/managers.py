from datetime import timedelta
from django.db import models
from django.utils import timezone

class VisitorManager(models.Manager):
    def get_in_last(self, model, ip_address, **kwargs):
        assert kwargs, "Must provide at least one timedelta arg (eg, days=1)"
        assert isinstance(model, models.Model), "model must be instance Model"

        period = timezone.now() - timedelta(**kwargs)
        return self.filter(object_id=model.id, ip_addr=ip_address, visit_time__gte=period) # type: ignore
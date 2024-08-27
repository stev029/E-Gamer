from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission untuk memastikan bahwa hanya pemilik objek yang bisa mengaksesnya.
    """

    message = "You cannot perform this action because you're not owner"

    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user == obj.seller.owner)
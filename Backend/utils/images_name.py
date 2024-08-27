import uuid

def unique_name_image(instance, filename):
    ext = filename.split('.')[-1]
    return f'products/images/{uuid.uuid4()}.{ext}'
from rest_framework import serializers

from products.models import Category, Game, Product, Tag

class ProductSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(max_length=100), source='tags.all', required=True)
    category = serializers.ListField(child=serializers.CharField(max_length=100), source='category.all', required=True)
    game = serializers.CharField(required=True)
    views = serializers.CharField(source='visitor.count', read_only=True)
    seller = serializers.StringRelatedField()
    price_amount = serializers.SerializerMethodField()

    def get_price_amount(self, obj):
        return 'Rp %s' % obj.price
    
    class Meta:
        model = Product
        # fields = '__all__'
        exclude = ['price']

    def update(self, instance, validated_data):
        tags = validated_data.pop('tags', [])
        categories = validated_data.pop('category', [])
        validated_data['game'] = Game.objects.get(id=validated_data['game'])

        # Clearing all Many objects data
        instance.tags.clear()
        instance.category.clear()

        for tag in tags.get('all'):
            tag_obj, _ = Tag.objects.get_or_create(name=tag)
            instance.tags.add(tag_obj)

        for category in categories.get('all'):
            category_obj, _ = Category.objects.get_or_create(id=category)
            instance.category.add(category_obj)

        return super().update(instance, validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        new_representation = {k: v for k, v in representation.items() if v}
        return new_representation
    
    def validate_game(self, value):
        if not value.isdigit():
            raise serializers.ValidationError('This field must be a number')
        return value

class ProductListSerializer(ProductSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'category', 'game',
                  'tags', 'url', 'stock', 'price_amount']
        extra_kwargs = {
            'price': {'required': True},
            'description': {'required': True},
            'stock': {'write_only': True},
        }

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        catgory_data = validated_data.pop('category', [])
        validated_data['game'] = Game.objects.get(id=validated_data['game'])
        obj = super().create(validated_data)

        for tag in tags_data.get('all'):
            tag_obj, _ = Tag.objects.get_or_create(name=tag)
            obj.tags.add(tag_obj)

        for category in catgory_data.get('all'):
            category_obj, _ = Category.objects.get_or_create(id=category)
            obj.category.add(category_obj)

        return obj

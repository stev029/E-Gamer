import random
import pandas as pd
from products.models import Product
from django.db.models import F
from django.core.cache import cache
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from django.db.models import Value, CharField
from django.db.models.functions import Concat

# Loads Dataset from database
def load_datasets():
    data = cache.get("dataset_from_database")

    if not data:
        qs = Product.objects.all().order_by('-id').annotate(
            product_id=F('id'),
            game_name=F('game__name'),
            category_name=Concat('category__name', Value(', '), output_field=CharField()),
            tag_name=Concat('tags__name', Value(', '), output_field=CharField())
        )
        data = qs.values('product_id', 'category_name', 'title', 'tag_name', 'game_name')

        cache.set("dataset_from_database", data, timeout=60*15)

    return pd.DataFrame(data)


def count_related_title(df):
    """Calculates cosine similarity between product titles using TF-IDF."""
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(df['title'])
    return cosine_similarity(tfidf_matrix, tfidf_matrix)


def get_related_game(df, product_id, n=5):
    """Retrieves products associated with the same game."""
    game = df.loc[df['product_id'] == product_id, 'game_name'].values[0]
    related_products = df[df['game_name'] == game]['product_id'].tolist()
    related_products = set(related_products)  # Remove duplicates
    related_products.discard(product_id)  # Remove the input product
    return list(related_products)[:n]


def get_related_products(df, product_id, cosine_sim, n=5):
    """Retrieves products with similar titles based on cosine similarity."""
    idx = df.index[df['product_id'] == product_id][0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:n+1]
    related_product_ids = [df['product_id'].iloc[i[0]] for i in sim_scores]
    related_product_ids = set(related_product_ids)  # Remove duplicates
    related_product_ids.discard(product_id)  # Remove the input product
    return list(related_product_ids)


def get_related_products_by_tags(df, product_id, n=5):
    """Retrieves products sharing common tags."""
    tags = df.loc[df['product_id'] == product_id, 'tag_name'].values[0].split(', ')
    df['tag_match'] = df['tag_name'].apply(lambda x: len(set(x.split(', ')) & set(tags)))
    related_products = df.sort_values('tag_match', ascending=False)['product_id'].tolist()
    related_products = set(related_products)  # Remove duplicates
    related_products.discard(product_id)  # Remove the input product
    return list(related_products)[:n]


def get_related_products_by_category(df, product_id, n=5):
    """Retrieves products belonging to the same categories."""
    categories = df.loc[df['product_id'] == product_id, 'category_name'].values[0].split(', ')
    df['category_match'] = df['category_name'].apply(lambda x: len(set(x.split(', ')) & set(categories)))
    related_products = df.sort_values('category_match', ascending=False)['product_id'].tolist()
    related_products = set(related_products)  # Remove duplicates
    related_products.discard(product_id)  # Remove the input product
    return list(related_products)[:n]


def related_products(product_id, s=0, n=5):
    """
    Generates a list of recommended products based on various factors.

    Args:
        product_id (int): The ID of the product to generate recommendations for.
        n (int, optional): The maximum number of recommendations to return. Defaults to 5.

    Returns:
        list: A list of product IDs representing the recommendations.
    """
    df = load_datasets()
    if product_id > len(df):
        return []

    cosine_sim = count_related_title(df)
    related_by_title = set(get_related_products(df, product_id, cosine_sim, n=n))
    related_by_category = set(get_related_products_by_category(df, product_id, n=n))
    related_by_tags = set(get_related_products_by_tags(df, product_id, n=n))
    related_by_game = set(get_related_game(df, product_id, n=n))

    combined_related_products = [*related_by_game, *related_by_title, *related_by_category, *related_by_tags]
    # print(combined_related_products)
    return combined_related_products[s:n]

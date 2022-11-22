from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from .models import *

# from django.contrib.auth.models import User
User = get_user_model()

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name')

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ('id', 'name', 'role', 'img_url', 'description', 'movies')

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('id', 'name', 'role', 'img_url', 'description', 'movies')

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        # ('id', 'title', 'title_en', 'rate', 'img_url', 'description', 'directors', 'actors', 'genres', 'users', 'open_date')
        read_only_fields = ('like_users',)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'content', 'score', 'movie', 'user')
    
class WorldcupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worldcup
        fields = ('id', 'movies')

class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'nickname', 'password',)

class UserSerializer(serializers.ModelSerializer):
    review_set = ReviewSerializer(many=True)
    movies = MovieSerializer(many=True)
    class Meta:
        model = User
        fields = '__all__'
        # ('id', 'username', 'review_set', 'movies')

class LikeMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeMovie
        fields =  '__all__'
        # ('id','user', 'likemovies')
        read_only_fields = ('user', )
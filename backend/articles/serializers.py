from rest_framework import serializers
from .models import Comment, Article

class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'image',)
        read_only_fields = ('user',)


class ArticleSerializer(serializers.ModelSerializer):

    class CommentInArticleSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comment
            fields = ('id', 'content',)
            read_only_fields = ('user',)

    comment_set = CommentInArticleSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)
    
    class Meta:
        model = Article
        fields = '__all__'

    # 게시글 좋아요 횟수 반환
    def get_like_count(self,instance):
        return instance.like_users.count()

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article',)
    # 댓글 좋아요 횟수 반환
    def get_like_count(self,instance):
        return instance.like_users.count()
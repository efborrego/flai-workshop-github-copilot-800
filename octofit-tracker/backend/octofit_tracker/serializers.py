from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model. Converts ObjectId to string."""
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}


class TeamSerializer(serializers.ModelSerializer):
    """Serializer for Team model. Converts ObjectId to string."""
    id = serializers.CharField(read_only=True)
    members = UserSerializer(many=True, read_only=True)
    member_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        write_only=True, 
        queryset=User.objects.all(),
        source='members'
    )
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'members', 'member_ids']


class ActivitySerializer(serializers.ModelSerializer):
    """Serializer for Activity model. Converts ObjectId to string."""
    id = serializers.CharField(read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    
    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_name', 'activity_type', 'duration', 'date']


class LeaderboardSerializer(serializers.ModelSerializer):
    """Serializer for Leaderboard model. Converts ObjectId to string."""
    id = serializers.CharField(read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'user_name', 'user_email', 'score']


class WorkoutSerializer(serializers.ModelSerializer):
    """Serializer for Workout model. Converts ObjectId to string."""
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'duration']

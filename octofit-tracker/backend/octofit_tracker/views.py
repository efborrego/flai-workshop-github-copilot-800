from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import (
    UserSerializer, 
    TeamSerializer, 
    ActivitySerializer, 
    LeaderboardSerializer, 
    WorkoutSerializer
)


@api_view(['GET'])
def api_root(request, format=None):
    """
    API root view that provides links to all available endpoints.
    """
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'teams': reverse('team-list', request=request, format=format),
        'activities': reverse('activity-list', request=request, format=format),
        'leaderboard': reverse('leaderboard-list', request=request, format=format),
        'workouts': reverse('workout-list', request=request, format=format),
    })


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for users.
    Supports list, create, retrieve, update, and delete operations.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint for teams.
    Supports list, create, retrieve, update, and delete operations.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    """
    API endpoint for activities.
    Supports list, create, retrieve, update, and delete operations.
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class LeaderboardViewSet(viewsets.ModelViewSet):
    """
    API endpoint for leaderboard.
    Supports list, create, retrieve, update, and delete operations.
    Ordered by score (highest first).
    """
    queryset = Leaderboard.objects.all().order_by('-score')
    serializer_class = LeaderboardSerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    """
    API endpoint for workouts.
    Supports list, create, retrieve, update, and delete operations.
    """
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

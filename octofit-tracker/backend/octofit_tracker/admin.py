from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """Admin interface for User model."""
    list_display = ['id', 'name', 'email']
    search_fields = ['name', 'email']
    ordering = ['name']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    """Admin interface for Team model."""
    list_display = ['id', 'name']
    search_fields = ['name']
    filter_horizontal = ['members']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    """Admin interface for Activity model."""
    list_display = ['id', 'user', 'activity_type', 'duration', 'date']
    list_filter = ['activity_type', 'date']
    search_fields = ['user__name', 'activity_type']
    date_hierarchy = 'date'
    ordering = ['-date']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    """Admin interface for Leaderboard model."""
    list_display = ['id', 'user', 'score']
    search_fields = ['user__name']
    ordering = ['-score']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    """Admin interface for Workout model."""
    list_display = ['id', 'name', 'duration']
    search_fields = ['name', 'description']
    ordering = ['name']

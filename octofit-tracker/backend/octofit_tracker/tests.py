from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, Team, Activity, Leaderboard, Workout
import datetime


class UserModelTest(TestCase):
    """Test case for User model."""
    
    def setUp(self):
        self.user = User.objects.create(
            name='Test User',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_user_creation(self):
        """Test that a user can be created with required fields."""
        self.assertEqual(self.user.name, 'Test User')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertTrue(isinstance(self.user, User))
        self.assertEqual(str(self.user), 'Test User')


class TeamModelTest(TestCase):
    """Test case for Team model."""
    
    def setUp(self):
        self.user1 = User.objects.create(name='User 1', email='user1@test.com', password='pass1')
        self.user2 = User.objects.create(name='User 2', email='user2@test.com', password='pass2')
        self.team = Team.objects.create(name='Test Team')
        self.team.members.set([self.user1, self.user2])
    
    def test_team_creation(self):
        """Test that a team can be created with members."""
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(self.team.members.count(), 2)
        self.assertEqual(str(self.team), 'Test Team')


class ActivityModelTest(TestCase):
    """Test case for Activity model."""
    
    def setUp(self):
        self.user = User.objects.create(name='Test User', email='test@example.com', password='pass')
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Running',
            duration=30.0,
            date=datetime.date.today()
        )
    
    def test_activity_creation(self):
        """Test that an activity can be created."""
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30.0)
        self.assertEqual(self.activity.user, self.user)


class LeaderboardModelTest(TestCase):
    """Test case for Leaderboard model."""
    
    def setUp(self):
        self.user = User.objects.create(name='Test User', email='test@example.com', password='pass')
        self.leaderboard = Leaderboard.objects.create(user=self.user, score=100)
    
    def test_leaderboard_creation(self):
        """Test that a leaderboard entry can be created."""
        self.assertEqual(self.leaderboard.score, 100)
        self.assertEqual(self.leaderboard.user, self.user)


class WorkoutModelTest(TestCase):
    """Test case for Workout model."""
    
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout routine',
            duration=45.0
        )
    
    def test_workout_creation(self):
        """Test that a workout can be created."""
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertEqual(self.workout.duration, 45.0)
        self.assertEqual(str(self.workout), 'Test Workout')


class UserAPITest(APITestCase):
    """Test case for User API endpoints."""
    
    def test_create_user(self):
        """Test creating a user via API."""
        url = reverse('user-list')
        data = {'name': 'API User', 'email': 'api@test.com', 'password': 'apipass'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().name, 'API User')


class TeamAPITest(APITestCase):
    """Test case for Team API endpoints."""
    
    def test_create_team(self):
        """Test creating a team via API."""
        url = reverse('team-list')
        data = {'name': 'API Team', 'member_ids': []}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Team.objects.count(), 1)


class ActivityAPITest(APITestCase):
    """Test case for Activity API endpoints."""
    
    def setUp(self):
        self.user = User.objects.create(name='Test User', email='test@example.com', password='pass')
    
    def test_create_activity(self):
        """Test creating an activity via API."""
        url = reverse('activity-list')
        data = {
            'user': self.user.id,
            'activity_type': 'Swimming',
            'duration': 60.0,
            'date': str(datetime.date.today())
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Activity.objects.count(), 1)


class LeaderboardAPITest(APITestCase):
    """Test case for Leaderboard API endpoints."""
    
    def setUp(self):
        self.user = User.objects.create(name='Test User', email='test@example.com', password='pass')
    
    def test_create_leaderboard_entry(self):
        """Test creating a leaderboard entry via API."""
        url = reverse('leaderboard-list')
        data = {'user': self.user.id, 'score': 500}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Leaderboard.objects.count(), 1)


class WorkoutAPITest(APITestCase):
    """Test case for Workout API endpoints."""
    
    def test_create_workout(self):
        """Test creating a workout via API."""
        url = reverse('workout-list')
        data = {
            'name': 'API Workout',
            'description': 'Created via API',
            'duration': 30.0
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Workout.objects.count(), 1)


class APIRootTest(APITestCase):
    """Test case for API root endpoint."""
    
    def test_api_root(self):
        """Test that the API root returns links to all endpoints."""
        url = reverse('api-root')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

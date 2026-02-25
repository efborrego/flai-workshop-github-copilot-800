from django.core.management.base import BaseCommand
from django.utils import timezone
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
import datetime


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting existing data...')

        # Delete in correct order to respect FK constraints
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users (superheroes)...')

        # Marvel heroes
        iron_man = User.objects.create(
            name='Tony Stark',
            email='tony.stark@avengers.com',
            password='ironman3000',
        )
        captain_america = User.objects.create(
            name='Steve Rogers',
            email='steve.rogers@avengers.com',
            password='freedom1945',
        )
        black_widow = User.objects.create(
            name='Natasha Romanoff',
            email='natasha.romanoff@avengers.com',
            password='redroom99',
        )

        # DC heroes
        batman = User.objects.create(
            name='Bruce Wayne',
            email='bruce.wayne@justice.com',
            password='gotham2024',
        )
        wonder_woman = User.objects.create(
            name='Diana Prince',
            email='diana.prince@justice.com',
            password='themyscira1',
        )
        flash = User.objects.create(
            name='Barry Allen',
            email='barry.allen@justice.com',
            password='speedforce1',
        )

        self.stdout.write('Creating teams...')

        team_marvel = Team.objects.create(name='Team Marvel')
        team_marvel.members.set([iron_man, captain_america, black_widow])

        team_dc = Team.objects.create(name='Team DC')
        team_dc.members.set([batman, wonder_woman, flash])

        self.stdout.write('Creating activities...')

        today = datetime.date.today()
        activities_data = [
            (iron_man, 'Running', 45, today - datetime.timedelta(days=1)),
            (iron_man, 'Weightlifting', 60, today - datetime.timedelta(days=2)),
            (captain_america, 'Running', 90, today - datetime.timedelta(days=1)),
            (captain_america, 'Swimming', 30, today - datetime.timedelta(days=3)),
            (black_widow, 'Martial Arts', 75, today - datetime.timedelta(days=1)),
            (batman, 'Running', 60, today - datetime.timedelta(days=1)),
            (batman, 'Martial Arts', 90, today - datetime.timedelta(days=2)),
            (wonder_woman, 'Weightlifting', 50, today - datetime.timedelta(days=1)),
            (flash, 'Running', 20, today - datetime.timedelta(days=1)),
            (flash, 'Cycling', 35, today - datetime.timedelta(days=3)),
        ]

        for user, activity_type, duration, date in activities_data:
            Activity.objects.create(
                user=user,
                activity_type=activity_type,
                duration=duration,
                date=date,
            )

        self.stdout.write('Creating leaderboard entries...')

        leaderboard_data = [
            (captain_america, 950),
            (batman, 900),
            (black_widow, 875),
            (wonder_woman, 850),
            (iron_man, 820),
            (flash, 800),
        ]

        for user, score in leaderboard_data:
            Leaderboard.objects.create(user=user, score=score)

        self.stdout.write('Creating workouts...')

        workouts_data = [
            ('Hero Endurance Run', 'A long-distance run inspired by Captain America and The Flash. Push your limits!', 60),
            ('Iron Man Circuit', 'Full-body strength circuit inspired by Tony Stark. Includes bench press, squats, and planks.', 45),
            ('Amazonian Strength', 'Weightlifting routine inspired by Wonder Woman. Focus on compound lifts.', 50),
            ('Dark Knight Combat', 'High-intensity martial arts and agility drills inspired by Batman.', 75),
            ('Black Widow Agility', 'Flexibility, balance, and agility training inspired by Natasha Romanoff.', 40),
            ('Speedster Intervals', 'Sprint interval training inspired by The Flash. Max speed, short rest.', 30),
        ]

        for name, description, duration in workouts_data:
            Workout.objects.create(name=name, description=description, duration=duration)

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db with superhero test data!'))

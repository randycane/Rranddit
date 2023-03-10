from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .subranddits import seed_subranddits, undo_subranddits
from .subscriptions import seed_subscriptions, undo_subscriptions

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_subranddits()
    seed_posts()
    seed_comments()
    seed_subscriptions()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_subscriptions()
    undo_posts()
    undo_comments()
    undo_subranddits()

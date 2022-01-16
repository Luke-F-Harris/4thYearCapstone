# Try some logging techniques

from datetime import datetime
import math


class GameLog:
    def __init__(self, game_id, players):
        self.game_id = game_id
        self.players = players
        
        self.events = []
    
    def add_event(self, event):
        self.events.append(event)
    
class Event:
    def __init__(self, name, initiator, before, after):
        self.name = name
        self.initiator = initiator
        self.before = before
        self.after = after
        self.actions = []
    
    def add_action(self, action):
        self.actions.append(action)





        


class NonNeutralGameEntity:
    def __init__(self, **kwargs):
        self.id = kwargs.get('id', 0)
        self.name = kwargs.get('name', None)
        self.created_at = datetime.now()
        self.destroyed_at = None
    
    def destroy(self):
        self.destroyed_at = datetime.now()

class Ship(Square, NonNeutralGameEntity):
    def __init__(self, name, owner, x, y, angle, h, w):
        super().__init__(name=name, owner=owner, x=x, y=y, angle=angle)
        
        self.speed = 10 # Assume that speed is the possible space covered in a tick
        
        self.h = h
        self.w = w

        self.health = 100
        self.max_health = 100
        
        self.shield = 100
        self.max_shield = 100
        
        self.weapon_cooldown = 10
        self.weapon_cooldown_max = 10
        
        self.weapon_damage = 5
        self.weapon_range = 10
        self.weapon_type = None
        self.weapons = []

        self.ship_type = None
        self.storage = []
        self.capacity = 1000

        self.size = 50
        self.crew = 30
        self.max_crew = 60

        self.resource_rate = 25

    def move(self, angle):
        self.change_position(angle, self.speed)

    def turn(self, angle):
        self.angle = angle


    



        
black_pearl = Ship("Black Pearl", "Player 1", 0, 0, 0)
titanic = Ship("Titanic", "Player 2", 0, 0, 0)
queen_annes_revenge = Ship("Queen Anne's Revenge", "Player 1", 0, 0, 0)
cyhtera = Ship("Citara", "Player 2", 0, 0, 0)
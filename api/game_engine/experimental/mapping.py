import math


class GameMap:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.game_positions = []
    
    # Allow some overflow
    def add_entity_overflow(self, entity):
        e_type = entity.__class__.__name__
        
        if e_type == "Square":
            # Account for the rotation of the square
            top_left_x = entity.x - entity.width/2 * math.cos(entity.rotation) + entity.height/2 * math.sin(entity.rotation)
            



        if e_type == "Circle":
            l_bound = entity.x - entity.radius
            r_bound = entity.x + entity.radius
            t_bound = entity.y - entity.radius
            b_bound = entity.y + entity.radius

            if l_bound < 0:
                l_bound = 0
            if r_bound > self.width:
                r_bound = self.width
            if t_bound < 0:
                t_bound = 0
            if b_bound > self.height:
                b_bound = self.height
            
        
            # Check if it overlaps with any other entities
            for e in self.game_positions:
                if e.__class__.__name__ == "Circle":
                    if e.x - e.radius < r_bound and e.x + e.radius > l_bound and e.y - e.radius < b_bound and e.y + e.radius > t_bound:
                        return -1

            self.game_positions.append(entity)
            return 1
        

    # No overflow
    def add_entity(self, entity):
        e_type = entity.__class__.__name__
        
        if e_type == "Circle":
            l_bound = entity.x - entity.radius
            r_bound = entity.x + entity.radius
            t_bound = entity.y - entity.radius
            b_bound = entity.y + entity.radius

            if l_bound < 0:
                return -1
            if r_bound > self.width:
                return -1
            if t_bound < 0:
                return -1
            if b_bound > self.height:
                return -1
            
            self.game_positions.append(entity)   
            return 1

    def remove_entity(self, entity):
        self.game_positions.pop(entity)

    
# The position is centered 
class Position:
    def __init__(self, **kwargs):
        self.x = kwargs.get('x', 0)
        self.y = kwargs.get('y', 0)
        self.angle = kwargs.get('angle', 0)

    
    def change_position(self, angle, distance):
        self.angle = angle
        self.x += distance * math.cos(self.angle)
        self.y += distance * math.sin(self.angle)


class Square(Position):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.width = kwargs.get('w', 0)
        self.height = kwargs.get('h', 0)
        self.angle = kwargs.get('angle', 0)

    def area(self):
        return self.width * self.height


class Circle(Position):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.radius = kwargs.get('r', 0)

    def area(self):
        return math.pi * self.radius ** 2



map = GameMap(100, 100)
s1 = Square(x=5, y=5, w=10, h=10, angle=0)
s2 = Square(x=15, y=5, w=10, h=10, angle=0)
c1 = Circle(x=25, y=5, r=5)


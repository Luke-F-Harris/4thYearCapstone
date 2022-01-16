import math

class Position:
    def __init__(self, **kwargs):
        self.x = kwargs.get('x', 0)
        self.y = kwargs.get('y', 0)
        self.angle = kwargs.get('angle', 0)

    
    def change_position(self, angle, distance):
        self.angle = angle
        self.x += distance * math.cos(self.angle)
        self.y += distance * math.sin(self.angle)



class Square:
    def __init__(self, **kwargs):
        self.position = Position(**kwargs)
        self.width = kwargs.get('width', 0)
        self.height = kwargs.get('height', 0)


    def change_position(self, angle, distance):
        self.position.change_position(angle, distance)





class Map:
    def __init__(self, **kwargs):
        self.squares = []
        self.size = kwargs.get('size', 0)


    def check_overlap(self, square1, square2):
        # Check for while accounting for angular orientation

        #             

    def add_square(self, square):
        # Check if there is overlap
        for s in self.squares:
            if self.check_overlap(s, square):
                return False


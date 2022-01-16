from datetime import datetime

# How do we validate these objects?


class Island:
    def __init__(self, name, x, y, width, height, resources):
        self.name = name
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.resources = resources
        self.ships = []
        self.owner = None

    def add_ship(self, ship):
        self.ships.append(ship)


class Ship:
    def __init__(self, owner, name, ship_type, num):
        self.owner = owner
        self.name = name
        self.ship_type = ship_type
        self.num = num
        self.created = datetime.now()
        self.berth = None
        self.berth_log = {}

    def add_berth(self, berth):
        self.berth = berth
        self.berth_log.append((berth, datetime.now()))

    def remove_berth(self):
        self.berth = None
        self.berth_log.append((None, datetime.now()))


class Resource:
    def __init__(self, name, amount):
        self.name = name
        self.amount = amount

    def increase(self, amount):
        self.amount += amount

    def decrease(self, amount):
        self.amount -= amount


class NPC:
    def __init__(self, name, npc_type):
        self.name = name
        self.npc_type = npc_type


class NPC_Adversary(NPC):
    def __init__(self, name, npc_type, ship_type, num):
        super().__init__(name, npc_type)
        self.ship_type = ship_type
        self.num = num


class NPC_Pirate(NPC):
    def __init__(self, name, npc_type):
        super().__init__(name, npc_type)


class NPC_Merchant(NPC):
    def __init__(self, name, npc_type):
        super().__init__(name, npc_type)


class NPC_Kraken(NPC):
    def __init__(self, name, npc_type):
        super().__init__(name, npc_type)


class NPC_Islander(NPC):
    def __init__(self, name, npc_type, island):
        super().__init__(name, npc_type)
        self.island = island


class NPC_Traveller(NPC):
    def __init__(self, name, npc_type):
        super().__init__(name, npc_type)

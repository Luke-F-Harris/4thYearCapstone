import os

from random import randint
from random import choice

from json import dumps
# This file is used to generate sample data.
# To keep all local databases consistant, use the sample data in /api/database/config/sql files. Do not run this file.

__location__ = os.path.realpath(os.path.join(
    os.getcwd(), os.path.dirname(__file__)))


def randint_exclude(i, bound):
    randInt = randint(0, bound)
    return randint_exclude(i, bound) if randInt == i else randInt


class UserData:
    def __init__(self, count):
        self.count = count
        self.data = []
        self.generate()

    def generate(self):
        for i in range(self.count):
            self.data.append({
                'first_name': self.random_string(10),
                'last_name': self.random_string(10),
                'username': self.random_string(10),
                'email': self.random_string(10) + '@' + "gmail" + '.com',
                'role': 'user',
                'password': "andrew",
                'password_confirm': "andrew",
                'score': randint(5, 2000)
            })

    def random_string(self, length):
        return ''.join(choice('abcdefghijklmnopqrstuvwxyz') for i in range(length))

    def sql(self):
        return '\n'.join(['INSERT IGNORE INTO users (first_name, last_name, username, email, role, password, score) VALUES ({first_name}, {last_name}, {username},{email}, {role}, {password}, {score});'.format(**user) for user in self.data])

    def json(self):
        return dumps(self.data)


class CodeData:
    def __init__(self, count, users_len):
        self.count = count
        self.data = []
        self.users_len = users_len
        self.generate(self.users_len)

    def generate(self, users_len):
        for i in range(self.count):
            self.data.append({
                'creator': randint(0, users_len),
                'code': '"print(1)"',
                'ranking': i
            })

    def sql(self):
        return '\n'.join(['INSERT INTO codes (creator, code, ranking) VALUES ({creator}, {code}, {ranking});'.format(**code) for code in self.data])

    def json(self):
        return dumps(self.data)


class GameData:
    def __init__(self, count, code_len):
        self.count = count
        self.data = []
        self.code_len = code_len
        self.generate(self.code_len)

    def generate(self, codes_len):
        for i in range(self.count):
            c1 = randint(0, codes_len - 1)
            c2 = randint_exclude(c1, codes_len - 1)
            winner_score = randint(10, 20)
            self.data.append({
                'winner_code': c1,
                'loser_code': c2,
                'winner_score': winner_score,
                'loser_score': 20-winner_score,
                'log': 'log'
            })

    def random_string(self, length):
        return ''.join(choice('abcdefghijklmnopqrstuvwxyz') for i in range(length))

    def sql(self):
        return '\n'.join(['INSERT INTO games (winner_code, loser_code, winner_score, loser_score, log) VALUES ({winner_code}, {loser_code}, {winner_score}, {loser_score}, {log});'.format(**game) for game in self.data])

    def json(self):
        return dumps(self.data)


this_is_dangerous = False  # You better know what you are doing

if __name__ == '__main__' and not this_is_dangerous:
    ndata = UserData(100)
    usql = (ndata.sql())
    with open(os.path.join(__location__, '../database/config/data/users.sql'), 'w') as f:
        f.write(usql)
    with open(os.path.join(__location__, '../database/config/data/users.json'), 'w') as f:
        f.write(ndata.json())
    ndata_entry = len(ndata.data)

    ndata = CodeData(150, ndata_entry)
    csql = ndata.sql()
    with open(os.path.join(__location__, '../database/config/data/codes.sql'), 'w') as f:
        f.write(csql)
    with open(os.path.join(__location__, '../database/config/data/codes.json'), 'w') as f:
        f.write(ndata.json())
    ndata_entry = len(ndata.data)

    ndata = GameData(100, ndata_entry)
    gsql = ndata.sql()
    with open(os.path.join(__location__, '../database/config/data/games.sql'), 'w') as f:
        f.write(gsql)
    with open(os.path.join(__location__, '../database/config/data/games.json'), 'w') as f:
        f.write(ndata.json())

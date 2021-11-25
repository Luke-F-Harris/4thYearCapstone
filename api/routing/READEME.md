# Routes

> ## cred.js: handles register/login


<hr>


**The register route** : ``/api/cred/register``

Register parameters:
- first_name
- last_name
- username
- email
- password
- password_confirm

<hr>

**The login route** : ``/api/cred/login``

Login parameters:
- username/eamil
- password

> ## user.js: Authenticated user operations


**Authentication test route**: ``/api/user/auth``

Pass token into the ``Authentication`` header.


> ## game.js: Game related routing
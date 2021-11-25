const setup = require('./config/db_setup');
const populate = require('./config/db_populate')

setup(true)
populate()
console.log('Database reset')
const express = require('express');
require('./services/logging')

const app = express();
const PORT = 3000;

// App configuaration
app.use(express.json());


// External routes
require('./routing/cred')(app);
require('./routing/user')(app);
require('./routing/game')(app);

app.get('/', (req, res) => {
    logger.info('GET /', "API");
    res.json("Hello world")
});

app.get('/logging', (req, res) => {
    logger.info('GET /logging', "API");
    logger.log('info', 'This is an info message');
    logger.warning('This is a warning message', 'WARN');
    logger.error('This is an error message', 'ERROR');
    res.json("Success")
})

app.listen(PORT, () => {
    logger.log(`Server is running on port ${PORT}`, "Server");
});
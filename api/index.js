const express = require('express');


const app = express();
const PORT = 3000;

// App configuaration
app.use(express.json());


// External routes
require('./routing/cred')(app);
require('./routing/user')(app);
require('./routing/game')(app);

app.get('/', (req, res) => {
    res.json("Hello world")
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
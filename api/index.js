const express = require('express');


const app = express();
const PORT = 3000;

// App configuaration
app.use(express.json());


// External routes
require('./routing/user')(app);



app.get('/', (req, res) => {
    res.json("Hello world")
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
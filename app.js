const express = require('express');

const serverless = require('serverless-http');

const port = process.env.PORT || 8000;

const app = express();

// const router = express.Router();

app.use(express.static('dist/views'));
app.use(express.static('JS'));

app.get('/', (req, res) => {
    res.sendFile('dist/index.html', { root: __dirname });
})

app.get('/login', (req, res) => {
    res.sendFile('dist/login.html', { root: __dirname });
})
app.get('/signup', (req, res) => {
    res.sendFile('dist/signup.html', { root: __dirname });
})

// app.use('/.netlify/functions/api', router);

app.listen(port);



// const bodyParser = require('body-parser');

// function updateDatabase(data) {
//     return newValue;
// }

// app.use(bodyParser);
// app.post('/updatestate', (req, res) => {
//     const newValue = updateDatabase(res.body);
//     res.json(newValue);
// });



module.exports.handler = serverless(app);
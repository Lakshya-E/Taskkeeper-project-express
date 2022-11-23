// const http = require("http");

// const fs = require("fs");

// const server = http.createServer((req, res) => {
//     let route = '';
//     res.setHeader('Content-Type', 'text/html');

//     switch (req.url) {
//         case '/':
//             route += '/index.html'
//             break;

//         case '/login':
//             route += '/login.html'
//             break;

//         case '/signup':
//             route += '/signup.html'
//             break;

//         default:
//             break;
//     }

//     fs.readFile(route, (err, data) => {
//         if (err) {
//             res.end(err);
//         } else {
//             res.end(data);
//         }
//     })
// })

// server.listen(3000, 'localhost');



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
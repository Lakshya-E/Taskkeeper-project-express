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

const app = express();

const router = express.Router();

app.use(express.static('dist/views'));
app.use(express.static('JS'));

router.get('/', (req, res) => {
    // res.json({
    //     'hello': 'hi',
    // })
    res.sendFile('dist/index.html', { root: __dirname });
})

router.get('/login', (req, res) => {
    res.json({
            'hello': 'login',
        })
        // res.sendFile('login.html', { root: __dirname });
})
app.get('/signup', (req, res) => {
    res.sendFile('signup.html', { root: __dirname });
})

app.use('/.netlify/functions/api', router);

// app.listen(8000);



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
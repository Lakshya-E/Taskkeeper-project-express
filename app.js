const express = require('express');
const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://Lakshya:nezukochan02@cluster0.5lyamfy.mongodb.net/task-list-keeper?retryWrites=true&w=majority';

const port = process.env.PORT || 3000;

mongoose.connect(mongodb).then(() => {
    console.log('connected');
    app.listen(port, () => {
        console.log('Listening on Port: 8000')
    })
}).catch(err => console.log(err));

const app = express();

const session = require('express-session');
app.use(session({ secret: "thisismysecret" }));

const bodyParser = require('body-parser');

const Data = require('./models/userData');

const auth = require('./middleware/loginAuth');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static('views'));
app.use(express.static('css'));
app.use(express.static('JS'));

let id = 0;
let userName = "";

app.get('/', auth.isLogout, (req, res) => {
    res.render('index');
})

app.get('/login', auth.isLogout, (req, res) => {
    res.render('login');
})
app.get('/signup', auth.isLogout, (req, res) => {
    res.render('signup');
})
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})
app.get('/home', auth.isLogin, async(req, res) => {
    try {
        res.render('home', { userName: userName });
    } catch (error) {
        console.log(error);
    }
})

app.get('/logout', auth.isLogin, async(req, res) => {
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
})

app.post('/user-data', async(req, res) => {

    try {
        console.log(req.body.name);

        const register = new Data({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const userRegister = await register.save();

        if (userRegister) {
            res.status(201).render('signup', { message: 'Registration is complete' });
        } else if (typeof userRegister.name === 'ValidatorError') {
            res.send('Enter name');
        } else {
            res.send('Registration Failed');
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

app.post('/user-login', async(req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const emailConst = await Data.findOne({ email: email });

        if (emailConst.name === name && emailConst.password === password) {
            id = emailConst._id;
            userName = emailConst.name;
            // nameGetter(id);
            req.session.user_id = emailConst._id;
            res.status(201).redirect('/home');
        } else if (emailConst.name != name) {
            res.status(404).render('login', { message: 'Incorrect Details' });
        } else {
            res.status(400).render('login', {
                message: 'Incorrect Details'
            });
        }

    } catch (error) {
        res.status(400).render('login', {
            message: 'Incorrect Details'
        });
    }
})

function nameGetter(id) {
    id = Data.findOne({ _id: id });
    console.log(id.name);
}






app.get('/*', auth.isLogin, (req, res) => {
    res.render('index');
})
const crypto = require('crypto');
const cors = require('cors');
const express = require('express');
const session = require('express-session');


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json());
app.use(session({
    secret: 'silksong',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
    }
}

));

let data = [
    {
        id: '1',
        email: 'szyszka@gmail.com',
        password: 'test',
        name: 'maciej',
        gender: true
      }
];

app.post('/send', (req, res) => {
    //console.log(req.body);
    data.push({ id: crypto.randomUUID(), ...req.body });
    res.sendStatus(200);
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const user = data.find(user => user.email === req.body.email && user.password === req.body.password);
    console.log(user);
    if (user) {
        req.session.user = { user };
        res.status(200).json({ message: 'Login successful' });
        console.log("logged in");
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log(req.session.user);
})

app.get('/get-user', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
})

app.get('/table', (req, res) => {
    //console.log(data)
    res.json(data);
});

app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    var dataClone = [];
    data.forEach(element => {
        if (element.id != req.params.id) {
            dataClone.push(element);
        }

    });
    data = dataClone;
    res.sendStatus(200);
})

app.listen(8000, () => {
    console.log('Server listening');
});
const crypto = require('crypto');
const cors = require('cors');
const express = require('express');


const app = express();

app.use(cors());
app.use(express.json());

let data=[];

app.post('/send', (req, res) => {
    //console.log(req.body);
    data.push({id: crypto.randomUUID(), ...req.body});
    res.sendStatus(200);
});

app.get('/table', (req, res) => {
    //console.log(data)
    res.json(data);
});

app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    var dataClone = [];
    data.forEach(element => {
        if(element.id != req.params.id) {
            dataClone.push(element);
        }
        
    });
    data = dataClone;
    res.sendStatus(200);
})

app.listen(8000, () => {
    console.log('Server listening');
});
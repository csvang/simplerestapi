const express = require('express');
const fs = require('fs');
const data = require('./data.json');

let app = express();

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

// let file = editJsonFile(`${__dirname}/data.json`, {
//     autosave: true
// });

app.get('/', (req,res) => {
    return res.send(data);
});

app.post('/', (req,res) => {
    data.push(req.body);
    saveData();
    return res.send(data); 
})

app.patch('/:id', (req,res) => {
    let find = data.find( (d) => d.id === parseInt(req.params.id) );
    
    if (find) {
        find.active = req.body.active;
    } else {
        return res.send(`${req.body.id} not found!`);
    }

    saveData();

    return res.send(find);
})

// app.delete('/:id', (req,res) => {
//     let find = data.find( (d) => d.id === parseInt(req.params.id) );
    
//     if (find) {
//         find.active = req.body.active;
//     } else {
//         return res.send(`${req.body.id} not found!`);
//     }

//     saveData();

//     return res.send(find);
// });

app.listen(3000, () => {
    console.log('Running!');
});

function saveData(){
    fs.writeFile(`${__dirname}/data.json`, 
        JSON.stringify(data), 
        err => { 
            if (err) throw err
            console.log('Written!');
        });
}


const express = require('express');
const fs = require('fs');


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;


function update(upName) {
  fs.writeFile('./db.txt', upName, err => {
    if (err) {
      console.error(err);
    }
  });
}

function fetchName(){
  //var name = '';
  return fs.readFileSync('./db.txt', 'utf8');

}

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    name = fetchName();
    console.log(name);
//    if(name != 'John'){
        res.render('home', {username: Buffer.from(name, 'base64').toString('ascii')});

  //  }else
  //      res.render('home', {username: 'John'});
});

app.get('/profile', (req, res)=>{
    res.render('profile', {message:''});
});

app.post('/profile', (req, res)=>{
    name = Buffer.from(req.body.username).toString('base64');
    update(name);
    res.render('profile', {message: 'Successfully updated!'});
});

app.listen(PORT, (error) => {
    if(!error)
        console.log("App is listening on port" + PORT)
    else
        console.log("Error occurred, server can't start", error);
});

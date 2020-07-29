const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const mongoose = require('./db/mongoose');

const WEB_PORT = process.env.PORT || 5000;
const API_PORT = process.env.PORT || 5001;
const app = express();
const api = express();

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 
    next();
});
app.use(express.static(__dirname + './../build'));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./../build','index.html'))
})

api.all('/*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 
    next();
});

api.use(usersRoutes);
api.use( (req, res, next) => {
    throw new HttpError('Could not find a route for the provided!',404);
});

api.use((error,req, res,next) => {
    if(res.headerSend){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose.connect()
.then(() => {
    app.listen(WEB_PORT);
    api.listen(API_PORT);
    console.log('web running '+process.env.NODE_ENV+' on port : ' + WEB_PORT);
    console.log('api running '+process.env.NODE_ENV+' on port : ' + API_PORT);
})
.catch(err => {
    console.log('Can not start application because can not connect database!');
})
const fs = require ('fs')
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose')
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error');


const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Method','GET, POST, PATCH, DELETE')
  next();
})

app.use('/api/places',placesRoutes);
app.use('/api/users', usersRoutes);


app.use((req, res, next)=>{
    const error = new HttpError('could not find this route.',404);
    throw error;
});

app.use((error, req, res, next)=>{

    if(req.file){
      fs.unlink(req.file.path, ()=>{
        //console.log(error)
      })
    }
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unkown error occurrend!'});
});
mongoose
  .connect('mongodb://localhost:27017/db_place_users')
  .then(() => {
    
    app.listen(5000,()=>{console.log('connection on port 5000')});
    console.log('db connected')
})
  .catch(err => {
    console.log(err);
  });
// const NewSchema= new mongoose.Schema({
//     name: String,
//     age:Number
// })

// const newModel = new mongoose.model("Collection", NewSchema);
// const data = new newModel({name:'mahdi',age:26})
// data.save();



const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeShema = new Schema({
    title: {type: String, required:true },
    description: {type:String, required: true},
    address: {type: String, required: true},
    image:{type: String, required: false},
    location:{
        lat:{type :Number, required:false},
        long:{type :Number, required:false},
    },
    creator: {type: mongoose.Types.ObjectId ,ref:'User'  ,required:false }
});

module.exports = mongoose.model('Place',placeShema);
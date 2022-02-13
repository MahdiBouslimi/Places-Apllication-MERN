const mongoose = require('mongoose')
//const uniqueValidators = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {type: String, required: true},
    email: {type : String, unique:true, required: true},
    password: { type: String, required: true, minlength: 6 },
    image: {type : String, required: true},
    places: [{type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
    
})
//userSchema.plugin(uniqueValidators);

module.exports= mongoose.model('User', userSchema)

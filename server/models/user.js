const mongoose = require("mongoose")
const user = mongoose.Schema({
    email:{
        type: 'string',
        unique: true,
        required: true
    }
    ,
    password:{
        type:"string",
        required:true
    }
})
const usermodel = mongoose.model("usermodel" , user)
module.exports = usermodel
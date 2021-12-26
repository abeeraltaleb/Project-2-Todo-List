const {Schema,model}= require('mongoose');

//schema
const userSchema= new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    username:String
    
})
//Model
const User=model("User",userSchema)

module.exports = User
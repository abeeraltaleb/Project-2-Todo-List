const {Schema,model}= require('mongoose');

//schema
const todoSchema= new Schema({
    title:String,
    isCompleteted:Boolean
})
//Model
const Todo=model("Todo",todoSchema)

module.exports = Todo
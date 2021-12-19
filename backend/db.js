const mongoose=require("mongoose");
const dbURI ="mongodb://localhost:27017/TodoListV01";


mongoose.connect(dbURI);


//Extra
const db= mongoose.connection;

db.on("erroe",(err)=>{
    console.log(err.message +"MongoDB not runing");
});

db.on("connected",(err)=>{
    console.log("MongoDB is  Connected")
});



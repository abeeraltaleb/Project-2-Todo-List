const express=require('express')
const app=express()
const db=require ('./db')
const Todo=require ('./todo')
//console.log(Todo);
app.use(express.json())

app.get("/",(req,res)=>{
    res.json("get is working")
})

app.get("/tasks",(req,res)=>{
    Todo.find({},(err,data)=>{
        if(err){
            console.log("ERRO: ",err);
        }else{
            res.json(data)
        }
    });
});
app.post("/tasks",(req,res)=>{
    console.log("25:", req.body)
    Todo.create(req.body,(err,newTask)=>{
        if(err){
            console.log("ERRO: ",err);
        }else{
            res.status(201).json("Created New Todo Successfully");
        }
    });
});

app.listen(5000,()=>{
    console.log("server is working")
});
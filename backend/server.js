const express=require('express');
const cors=require('cors');
const app=express();

const db=require ('./db');
const Todo=require ('./todo');
const User=require ('./user');

//console.log(Todo);
app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.json("get is working")
})

//CRUD: Create , Read , Update , Delete 
app.get("/tasks",(req,res)=>{
    Todo.find({},(err,data)=>{
        if(err){
            console.log("ERRO: ",err);
        }else{
            res.json(data)
        }
    });  
});

//          ?key=value&key=value
app.get("/filter",(req,res)=>{
    console.log(req.query);
    Todo.find({isCompleted:req.query.isCompleted},(err,data)=>{
        if(err){
            console.log("ERRO: ",err);
        }else{
            res.json(data)
        }
    });
});

/*
the up endpoint is replace to these two
app .get("/tasks/done",(req,res)=>{
    Todo.find({isCompleted:true},(err,data)=>{
        if(err){
            console.log("ERRO: ",err);
        }else{
            res.json(data)
        }
    });
});
app.get("/tasks/pending",(req,res)=>{
    Todo.find({isCompleted:false},(err,data)=>{
        if(err){
            console.log("ERRO: ",err);
        }else{
            res.json(data)
        }
    });
});
*/
app.delete("/tasks",(req,res)=>{
    //console.log("37:", req.params.id);
    Todo.deleteMany({isCompleted:true},(err,deleteObj)=>{
        
      if (err) {
          console.log("ERROR: ",err);
      }else{
          deleteObj.deletedCount === 0
          ?  res.status(404).json ("There is no comoleted todo found")
          :  res.json("Delete all completed Todo Successfully")
      }
})
    // deleted more than one document
}); 

app.put("/tasks/:id/:isCompleted", (req, res) => {
    console.log("124:", req.params);
    Todo.updateOne(
      { _id: req.params.id },
      { isCompleted: req.params.isCompleted },
      (err, updateObj) => {
        if (err) {
          // console.log("ERROR: ", err);
          res.status(400).json(err);
        } else {
          console.log(updateObj);
          updateObj.modifiedCount === 1
            ? res.json("Update one todo successfully")
            : res.status(404).json("This todo is not found");
        }
      }
    );
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

  app.delete("/tasks/:id",(req,res)=>{
      console.log("37:", req.params.id);
      Todo.deleteOne({_id:req.params.id},(err,deleteObj)=>{
          
        if (err) {
            console.log("ERROR: ",err);
        }else{
            deleteObj.deletedCount===1
            ? res.json("Deleted New one Todo Successfully")
            : res.status(404).json ("this todo is not found")
        }
  })
      // deleted at most one tank document

  });

  app.put("/tasks/:id",(req,res)=>{
    //console.log("37:", req.params.id);
    Todo.updateOne(
        {_id:req.params.id},
        {title:req.body.newTitle},
        (err,updateObj)=>{
        if (err) {
        //console.log("ERROR: ",err);
        res.status(400).json(err)
        }else{
            console.log(updateObj);
            updateObj.modifiedCount===1
            ? res.json("update New one Todo Successfully")
            : res.status(404).json ("this todo is not found");
        }
})
    // update at most one tank document

});

//USER
app.post("/users/register",(req,res)=>{
    User.create(req.body,(err,newUser)=>{
        if(err){
           //console.log("ERRO: ",err);
            res.status(400).json({message:"This email already taken"})

        }else{
            res.status(201).json({ message: "Create New User Successfully" });
        }
    });
});

app.post("/users/login", (req, res) => {
    User.find({ email: req.body.email }, (err, arrUserFound) => {
        if (err) {
        console.log("ERROR: ", err);
        } else {
        // console.log(arrUserFound);
        if (arrUserFound.length === 1) {
          // we found the user
            if (req.body.password === arrUserFound[0].password) {
            // password correct
            res.status(200).json({
                message: "Login Successfully",
                username: arrUserFound[0].username,
            });
            } else {
            // password incorrect
            res.status(400).json({
                message: "Wrong password",
            });
            }
        } else {
            res.status(404).json({
            message: "The email entered is not registered",
            });
        }
        }
    });
  });
app.listen(5000,()=>{
    console.log("server is working....")
});
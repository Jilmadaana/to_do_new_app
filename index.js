
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const app = express();
const todoModel = require('./models/todo_model.js');

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('this is our second api we are buiding');

});
app.post('/todos',async(req, res)=>{
    const todo = todoModel.create({
        title: req.body.title,
        body:req.body.body,
        status: req.body.status,
        endDate: req.body.endDate


    });
    try{
        const saveTodo = await todo.save();
        res.json({
            data:saveTodo,
            message:"saved"
        });
    }catch(err){
        res.json({
            message:err
        });
    }
});
    app.get('/todos',async(req, res)=>{

    
    try{
        const getAllTodos = await todoModel.find();
        res.json({
            data:getAllTodos,
            message:"operation successful"
        });
    }catch(err){
        res.json({
            message:err
        });
    }
});
app.get('/todos/todoId',async(req, res)=>{


try{
    const getAllTodos = await todoModel.findById(_id.req.body.id);
    res.json({
        data:getAllTodos,
        message:"operation successful"
    });
}catch(err){
    res.json({
        message:err
    });
}
});

app.delete('/todos/:todoId',(req, res)=>{
    try{

     todoModel.findOneAndDelete({_id:req.params.todoId});
     res.json({
         data:deleteTodo,
         message:"Todo successfuly deleted"
     })
    }
     catch(err){
         res.json({
             message:err
         })
     }
});

app.patch('/todo/:todoId',(req, res)=>{
    try{
    todoModel.findOneAndUpdate({_id:req.params.todoId},{$set:{
        title:req.body.title,
        status:req.body.status,
        body:req.body.body
    }});
    res.json({
        data: updateTodo,
        message: "Todo successfully updated"
    });
    }catch(err){
        res.json({
            message:err

        });
        
    }
});
 
mongoose.connect(process.env.DB_URL,
()=>console.log('successfully connected'));


app.listen(1002);
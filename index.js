const express = require('express');
const { resolve } = require('path');
const MenuItem=require('./model/MenuItem');
const mongoose=require('mongoose');

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static('static'));

const dbURI='mongodb+srv://ayishathnahdas69:Nahda@cluster2.c9k9d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2';
mongoose.connect(dbURI)
.then(()=> console.log('Connected to MongoDB'))
.catch(()=>console.log('Error connecting to MongoDB:',err));


app.post('/menu',(req,res)=>{
  const {name,description,price}= req.body;

  if(!name || !description|| !price){
    return res.status(400).json({error:'Name and price required'});

  }
  
  const newMenuItem=new MenuItem({name,description,price});

  newMenuItem.save()
  .then(menuItem => {
    res.status(201).json({msg:'MenuItem created successfully',menuItem});
  })
  .catch(err=>{
    res.status(500).json({error:'Error creating MenuItem'});
  });


});

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

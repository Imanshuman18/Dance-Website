const express=require("express");
const path=require('path');
const mongoose = require('mongoose');
const { address } = require("ip");
mongoose.connect('mongodb://0.0.0.0:27017/contactdance');
const bodyparser=require('body-parser')
const app=express();
const port=80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug')//set the template engine as pug

app.set('views',path.join(__dirname,'views'))//set the views directory
//END POINTS
app.get("/",(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params)
})
app.post("/contact",(req,res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('home.pug',params)
})
app.get("/contact",(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',)
})


//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started succesfully on ${port}`);
})

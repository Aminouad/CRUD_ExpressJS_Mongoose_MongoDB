const express=require("express");
const res = require("express/lib/response");

const app=express();
const mongoose=require('mongoose');
const Etudiant=require("./models/etudiant");
const bodyParser=require("body-parser");


app.use(bodyParser.urlencoded({extended:false}));
//parse app/json
app.use(bodyParser.json());


//get
app.get('/etudiants',async (req,res)=>{

try {

    await Etudiant.find({})
    .then(result=>{
          res.send(result)

    })

}catch(err){
    console.log(err)
}




});



//POST
app.post('/ajouter_etudiant',async(req,res)=>{


try {


    let new_etudiant=new Etudiant({
        cin : req.body.cin ,
        nom : req.body.nom ,
        prenom : req.body.prenom ,
        email : req.body.email 
    });
    await new_etudiant.save();
    res.send('save operation succeeded')  

}catch(err){
    console.log(err);
}

});

//Delete
app.delete('/delete/:cin',async(req,res)=>{
   
try {
    await Etudiant.findOneAndDelete({cin:req.params.cin});
    res.send("deleted");
    
} catch (err) {
    res.send(err);
    
}


});

//Update
app.put('/update/:cin',async(req,res)=>{


    try {
        
await Etudiant.findOneAndUpdate({cin:req.params.cin},{
    email:req.body.email
});
  
  res.send('update successuflly')


    } catch (error) {
        res.send(error);
    }

});

mongoose.connect('mongodb+srv://amin:amin@cluster0.vyfyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(err,done)=>{
    if(err){
        console.log(err)
    }
   if(done){
       console.log('base de donnee avec succes')
   }

});

//mongodb+srv://amin:<password>@cluster0.vyfyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.listen(5000,()=>console.log("server ok d running don't worry"));
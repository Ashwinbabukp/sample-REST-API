
const Joi = require("Joi");
const express = require ("express");

const app =express();

app.use(express.json());

const users = [
    { id: 1, name: 'userl'},
    { id: 2, name: 'user2'},
    { id: 3, name: 'user3'},
];

app.get('/', (req,res) => {
    res.send("say hey");

});
app.get('/api/users',(req, res) => {
    res.send(users);

});

app.post('/api/users' , (req,res) =>{
    const{ error }= validateUser(req.body);
    if (error){
    res.status(400).send(error.details[0].message);
    return; 
}
        
    
    const user = {
        id: users.length +1,
        name: req.body.name 

    };

    users.push(user);
    res.send(user);
});

app.put('/api/users/:id' , (req, res) =>{
    const user = users.find(c => c.id === parseInt(req.params.id));
       if (!user) res.status(404).send ('the user is not found');

        

      
      const{ error }= validateUser(req.body);
    if (error){
    res.status(400).send(error.details[0].message);
    return; 
}


user.name =req.body.name;
res.send(user);
});

app.delete('/api/users/:id',(req,res)=>{
    const user = users.find(c => c.id === parseInt(req.params.id));
       if (!user) res.status(404).send ('the user is not found');

       const index=users.indexOf(user);
       users.splice(index ,1);
       res.send(user);

});


function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return  Joi.validate(user, schema);

}








  
app.get('/api/users/:id' , (req, res)=>{
      const user = users.find(c => c.id === parseInt(req.params.id));
       if (!user) res.status(404).send ('the user is not found');
       res.send(users);

});

// PORT
 const port =process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`its Running  ${port}....🚀`);
});

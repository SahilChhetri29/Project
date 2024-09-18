const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/employeeRoutes');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(routes);

app.listen(3000, (err, data)=>{
    if(err){
        console,log(err);
    }
    else{
        console.log('Connected and running at port 3000...');
    }
});

// mongoose.connect('mongodb+srv://.szk2me6.mongodb.net/EmployeeTable?retryWrites=true&w=majority&appName=mycluster')
// .then(result =>{
//     app.listen(3000, (err, data)=>{
//         if(err){
//             console,log(err);
//         }
//         else{
//             console.log('Connected and running at port 3000...');
//         }
//     })
// })
// .catch(err =>{
//     console.log('Error connecting to daatabase ',err);
// })
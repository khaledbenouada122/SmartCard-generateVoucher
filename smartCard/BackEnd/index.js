const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const db = require('../BackEnd/src/models')
const PORT = process.env.PORT || 5500;
 
const declareRoutes = require('./src/helpres/declareRoutes')
const app = express();
app.get('/',(req,res)=>{
  res.send('<a href="/auth/google"> Authentificate with google</a>')
})



app.use(bodyParser.json());
// declare all the routes in the application
declareRoutes(app)
// connect with postgres dataBase
db.sequelize.sync({ alter: true }).then(() => {
    console.log('dataBase Connecting  successfully !')
  })
  //Connect with the Backend Server
  app.listen(PORT, () => {
    console.log('The backend project is running on port:', PORT)	
  })
  

  
  
  
const express = require('express');
const ruid = require('express-ruid');
const app = require('express')();
 // Import tracing.js
 require('./tracing');
 const initTracing = require('./tracing');

// Passer le nom du service correspondant à chaque microservice
initTracing('service-b');

const { v4: uuidv4 } = require('uuid');
  app.use(ruid());
    path = require('path');
    bodyParser = require('body-parser'),
    cors = require('cors');
    require('dotenv').config();
    const mongoose = require('mongoose'),
    config = require('./DB');
    var passport = require('passport');
    
    const logger = require('./logger');

    app.use(express.static(path.join(__dirname, '/')));
    const port = process.env.PORT || 3002;
   
    const mongoUrl = process.env.MONGO_URI;
   
   
      mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }).then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Failed to connect to MongoDB', err));
     
    
        require('./models/Utilisateur');
        
        const userRoutes = require('./routes/user.route');
       

    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401);
            res.json({"message" : err.name + ": " + err.message});
        }
    });


    app.get('/', (req, res) => {
      const span = tracer.startSpan('example-operation');
      
      // Ajouter des attributs clés
      span.setAttribute('requestId', req.rid);
      
      // Capturer des événements spécifiques
      span.addEvent('database-query-start');
      
      // Exécuter une opération et terminer le span
      someOperation().then(() => {
        span.end();
        res.send('Request completed');
      });
    });



    app.use(bodyParser.json());
    app.use(cors());
    app.use('/users', userRoutes);
  
    require('./config/passport');
   
    require("dotenv").config();
    app.use(passport.initialize());

   
    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
     
    });  //SEERVEUR VPS
    
   
    
   
   

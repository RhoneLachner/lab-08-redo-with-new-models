const express = require('express');
const app = express();
const Computer = require('../../models/Computer.js');
const Application = require('../../models/Application.js');

//ENDPOINTS

app.use(express.json());

app.post('/computers', (req, res, next) => {
  Computer
    .insert(req.body)
    .then(computer => res.send(computer))
    .catch(next);
});

app.get('/computers', (req, res) => {
  Computer
    .find()
    .then(computer => res.send(computer));
});

app.get('/computers/:id', (req, res) => {
  Computer
    .findById(req.params.id)
    .then(computer => res.send(computer));
  
});

app.put('/computers/:id', (req, res) => {
  Computer
    .update(req.params.id, req.body)
    .then(computer => res.send(computer));
    
});

app.delete('/computers/:id', (req, res) => {
  Computer
    .delete(req.params.id)
    .then(computer => res.send(computer));
   
});
app.post('/applications', (req, res, next) => {
  Application
    .insert(req.body)
    .then(application => res.send(application))
    .catch(next);
  
});
  
app.get('/applications', (req, res, next) => {
  Application
    .find()
    .then(application => res.send(application))
    .catch(next);
});
  
app.get('/applications/:id', (req, res, next) => {
  Application
    .findById(req.params.id)
    .then(application => res.send(application))
    .catch(next);  
});
  
app.put('/applications/:id', (req, res, next) => {
  Application
    .update(req.params.id, req.body)
    .then(application => res.send(application))
    .catch(next);    
});
  
app.delete('/applications/:id', (req, res, next) => {
  Application
    .delete(req.params.id)
    .then(application => res.send(application))
    .catch(next);   
});
  


module.exports = app;


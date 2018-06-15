const todo = require('../models/todo'),
      login = require('../models/login'),
      signin = require('../models/signin'),
      passwordHash = require('password-hash');

module.exports = {
  configure: function(app) {
    app.post('/signin', urlencodedParser, function(req,res){
      let user = {"mail": req.body.mailSign, "passW": passwordHash.generate(req.body.pwSign)};
      console.log(req.body.mailSign);
      signin.post(user,res);
    });
    app.get('/login',function(req,res){
      res.render('login');
    });
    app.post('/login', urlencodedParser, function(req,res){
      let content = JSON.stringify({mail: req.body.mail, pass:req.body.pwRonin});
      login.post(content,res);
    });
    app.get('/todo',function(req,res) {
      todo.get(res)
      .then(function(todos){
        res.render("index",{todolist:todos});
        })      
    });
    app.get('/todo/:id',function(req,res) {cls

      todo.getByID(req.params.id,res);
      res.redirect();
    });
    app.post('/todo', urlencodedParser, function(req,res) {
      todo.create(req.body.newtodo,res)
      .then(function(toCreate){
         res.redirect('./todo')
      })   
    });
    app.put('/todo/:id',function(req,res) {
      todo.update(req.body.name,req.params.id,res);
    });
    app.delete('/todo/delete/:id', function(req,res) {
      todo.delete(req.params.id,res)
      .then(function(toDelete){
        res.redirect('../../todo')
      })
    });
  }
};

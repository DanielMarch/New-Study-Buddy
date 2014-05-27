'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.index = (req, res)=>{
  var userId = req.session.userId;
  if(userId)
  {
    res.render('user/index', {userId: userId, title: 'Welcome Back To Open Course'});
  }
  else
  {
    res.redirect('/portal');
  }
};

exports.create = (req, res)=>{
  var user = new User(req.body);
  user.create(user=>{
    console.log(user);
    req.session.userId = user._id;
    res.redirect('/user');
    // res.redirect('/portal');
  });
};

exports.login = (req, res)=>{
  var user = new User(req.query);
  user.login(u=>{
    if(u){
      req.session.userId = u._id;
      res.redirect('/user');
    }else{
      req.session.userId = null;
      res.redirect('/portal');
    }
  });
};

exports.logout = (req, res)=>{
  req.session = null;
  delete req.session;
  res.redirect('/portal');
};

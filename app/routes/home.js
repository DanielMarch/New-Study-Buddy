'use strict';

exports.index = (req, res)=>{
  var userId = req.session.userId;
  res.render('home/index', {userId: userId, title: 'Node.js: Home'});
};
exports.about = (req,res)=>{
  var userId = req.session.userId;
  res.render('home/about', {userId: userId, title: 'About Page'});
};
exports.portal = (req, res)=>{
  var userId = req.session.userId;
  res.render('home/portal', {userId: userId, title: 'User Portal'});
};

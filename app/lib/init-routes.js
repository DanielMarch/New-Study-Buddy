'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var courses = traceur.require(__dirname + '/../routes/courses.js');
  var lessons = traceur.require(__dirname + '/../routes/lessons.js');
  var tests = traceur.require(__dirname + '/../routes/tests.js');

  app.get('/', dbg, home.index);
  app.get('/about', dbg, home.about);
  app.get('/portal', dbg, home.portal);
  app.get('/login', dbg, users.login);
  app.get('/logout', dbg, users.logout);
  app.get('/user', dbg, users.index);
  app.post('/signup', dbg, users.create);
  app.get('/courses', dbg, courses.index);
  app.get('/courses/filter/:subject', dbg, courses.filter);
  app.get('/courses/:courseId', dbg, courses.view);
  app.get('/lessons/:lessonId', dbg, lessons.index);
  app.get('/lessons/:lessonId/test', dbg, tests.index);
  app.get('/user/courses/new', dbg, courses.new);
  app.get('/user/courses', dbg, courses.user);
  app.post('/user/courses', dbg, courses.create);
  app.get('/user/courses/:courseId', dbg, courses.prepEdit);
  app.put('/user/courses/:courseId', dbg, courses.edit);
  app.delete('/user/courses/:courseId', dbg, courses.destroy);
  app.get('/user/courses/:courseId/lessons/new', dbg, lessons.new);
  app.post('/user/courses/:courseId/lessons', dbg, lessons.create);
  app.get('/user/courses/lessons/:lessonId', dbg, lessons.prepEdit);
  app.post('/user/courses/lessons/:lessonId', dbg, lessons.edit);
  app.delete('/user/courses/lessons/:lessonId', dbg, lessons.destroy);
  app.get('/user/courses/lessons/:lessonId/test', dbg, tests.new);
  app.post('/user/courses/lessons/:lessonId/test', dbg, tests.create);
  // app.get('/user/courses/lessons/test/:questionId', dbg, tests.prepEdit);
  app.delete('/user/courses/lessons/test/:questionId', dbg, tests.destroy);
  app.post('/user/:userId/lessons/:lessonId/test', dbg, tests.score);

  console.log('Routes Loaded');
  fn();
}

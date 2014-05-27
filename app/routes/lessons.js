 'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var Lesson = traceur.require(__dirname + '/../models/lesson.js');
var fs = require('fs');
var _ = require('lodash');

exports.index = (req,res)=>{
  var userId = req.session.userId;
  var lessonId = req.params.lessonId;
  Lesson.getByLessonId(lessonId, lesson=>{
    res.render('lessons/index', {userId:userId, lesson: lesson, title:'A Lesson'});
  });
};

exports.destroy = (req,res)=>{
  var lessonId = req.params.lessonId;
  Lesson.getByLessonId(lessonId, lesson=>{
    lesson = _.create(Lesson.prototype, lesson);
    lesson.destroy(()=>res.redirect('/user/courses'));
  });
};

exports.new = (req,res)=>{
  var courseId = req.params.courseId;
  var userId = req.session.userId;
  Course.getByCourseId(courseId, course=>
  {
    if(String(course.userId) === req.session.userId)
    {
      res.render('lessons/new', {userId: userId, course: course, title:'Create Lesson'});
    }
    else
    {
      res.redirect('/user');
    }
  });
};

exports.create = (req,res)=>{
  var courseId = req.params.courseId;
  Course.getByCourseId(courseId, course=>
  {
    if(String(course.userId) === req.session.userId)
    {
      var newLesson = new Lesson(req.body, course._id);
      newLesson.save(lesson=>
      {
        fs.writeFile(__dirname + '/../static/materials/' +  lesson._id + '.html', req.body.material);
        res.redirect('/user/courses/'+course._id);
      });
    }
    else
    {
      res.redirect('/user');
    }
  });
};

exports.prepEdit = (req, res)=>
{
  var lessonId = req.params.lessonId;
  Lesson.getByLessonId(lessonId, lesson=>
  {
    if(lesson)
    {
      Course.getByCourseId(lesson.courseId, course=>
      {
        if(String(course.userId) === req.session.userId)
        {
          fs.readFile(__dirname + '/../static/materials/' +  lesson._id + '.html', 'utf8', (e, material)=>
          {
            res.render('user/lesson', {material: material, lesson: lesson, title: 'Edit Lesson'});
          });
        }
        else
        {
          res.redirect('/user');
        }
      });
    }
    else
    {
      res.redirect('/user');
    }
  });
};

exports.edit = (req, res)=>
{
  var lessonId = req.params.lessonId;
  Lesson.getByLessonId(lessonId, lesson=>
  {
    if(lesson)
    {
      Course.getByCourseId(lesson.courseId, course=>
      {
        if(String(course.userId) === req.session.userId)
        {
          lesson = _.create(Lesson.prototype, lesson);
          lesson.edit(req.body);
          lesson.save(()=>
          {
            var path = __dirname + '/../static/materials/' +  lesson._id + '.html';
            fs.unlink(path, ()=>
            {
              fs.writeFile(path, req.body.material);
              res.redirect('/user/courses/'+course._id);
            });
          });
        }
        else
        {
          res.redirect('/user');
        }
      });
    }
    else
    {
      res.redirect('/user');
    }
  });
};

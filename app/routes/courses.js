'use strict';

var _ = require('lodash');
var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var Lesson = traceur.require(__dirname + '/../models/lesson.js');

exports.index = (req, res)=>{
  var userId = req.session.userId;
  Course.getAll(courses=>
  {
    res.render('courses/index', {userId: userId, courses: courses, title: 'Available Courses'});
  });
};

exports.filter = (req, res)=>{
  var userId = req.session.userId;
  Course.getBySubject(req.params.subject, courses=>
  {
    res.render('courses/index', {userId: userId, courses: courses, title: 'Available Courses: '+req.params.subject});
  });
};

exports.view = (req, res)=>{
  var userId = req.session.userId;
  Course.getByCourseId(req.params.courseId, course=>{
    Lesson.getByCourseId(req.params.courseId, lessons=>{
      console.log(course);
      console.log(lessons);
      res.render('courses/view', {userId: userId, course: course, lessons: lessons, title: course.name});
    });
  });
};

exports.new = (req,res)=>{
  var userId = req.session.userId;
  res.render('courses/new', {userId: userId, title:'Create a New Course'});
};

exports.create = (req, res)=>{
  Course.getByUserId(req.session.userId, courses=>
  {
    var newCourseParams = req.body;
    if(courses.length)
    {
      var isUsedName = courses.filter(course=>course.name === newCourseParams.name).length ? true : false;
      if(!isUsedName)
      {
        createCourse();
      }
      else
      {
        console.log('NAME IN USE');
      }
    }
    else
    {
      createCourse();
    }

    function createCourse()
    {
      var newCourse = new Course(newCourseParams, req.session.userId);
      newCourse.save(()=>res.redirect('/user/courses'));
    }
  });
};

exports.user = (req,res)=>{
  var userId = req.session.userId;
  if(userId)
  {
    Course.getByUserId(userId, courses=>{
      res.render('user/courses', {userId: userId, courses: courses, title: 'My Courses'});
    });
  }
  else
  {
    res.redirect('/portal');
  }
};

exports.prepEdit = (req,res)=>{
  var userId = req.session.userId;
  var courseId = req.params.courseId;
  Course.getByCourseId(courseId, course=>
  {
    if(String(course.userId) === req.session.userId)
    {
      Lesson.getByCourseId(courseId, lessons=>res.render('user/course', {userId: userId, course: course, lessons: lessons, title: 'Edit Course'}));
    }
    else
    {
      res.redirect('/user');
    }
  });
};

exports.edit = (req,res)=>{
  var courseId = req.params.courseId;
  Course.getByCourseId(courseId, course=>
  {
    if(String(course.userId) === req.session.userId)
    {
      course = _.create(Course.prototype, course);
      course.edit(req.body);
      course.save(()=>res.redirect('/user/courses'));
    }
    else
    {
      res.redirect('/user/courses');
    }
  });
};

exports.destroy = (req,res)=>{
  var courseId = req.params.courseId;
  Course.getByCourseId(courseId, course=>
  {
    if(String(course.userId) === req.session.userId)
    {
      course = _.create(Course.prototype, course);
      course.destroy(()=>res.redirect('/user/courses'));
    }
    else
    {
      res.redirect('/user/courses');
    }
  });
};

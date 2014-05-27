//_id
//userId
//name
//subject
//description

var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');

class Course
{
  constructor(obj, userId)
  {
    this.userId = Mongo.ObjectID(userId);
    this.name = obj.name;
    this.subject = obj.subject;
    this.description = obj.description;
  }

  save(fn)
  {
    courses.save(this, ()=>fn());
  }

  edit(obj)
  {
    this.name = obj.name;
    this.subject = obj.subject;
    this.description = obj.description;
  }

  destroy(fn)
  {
    courses.remove({_id: this._id}, true, ()=>fn());
  }

  static getAll(fn)
  {
    courses.find().toArray((e, courses)=>
    {
      fn(courses);
    });
  }

  static getBySubject(subject, fn)
  {
    courses.find({subject: subject}).toArray((e, courses)=>
    {
      fn(courses);
    });
  }

  static getByCourseId(courseId, fn)
  {
    courseId = objectIDSafe(courseId);
    courses.findOne({_id: courseId}, (e, course)=>
    {
      if(!course)
      {
        course = {};
      }
      fn(course);
    });
  }

  static getByUserId(userId, fn)
  {
    userId = objectIDSafe(userId);
    courses.find({userId: userId}).toArray((e, courses)=>
    {
      fn(courses);
    });
  }
}

function objectIDSafe(id)
{
  'use strict';

  id = String(id);
  if(id.match(/^[0-9a-fA-F]{24}$/))
  {
    return Mongo.ObjectID(id);
  }
  return id;
}

module.exports = Course;

//_id
//name
//courseId
//description
//testTimer
//passingScore

var lessons = global.nss.db.collection('lessons');
var Mongo = require('mongodb');

class Lesson
{
  constructor(obj, courseId)
  {
    this.name = obj.name;
    this.courseId = Mongo.ObjectID(courseId);
    this.description = obj.description;
    this.testTimer = obj.testTimer;
    this.passingScore = obj.passingScore;
  }

  save(fn)
  {
    lessons.save(this, (e, lesson)=>
    {
      fn(lesson);
    });
  }

  edit(obj)
  {
    this.name = obj.name;
    this.description = obj.description;
    this.testTimer = obj.testTimer;
    this.passingScore = obj.passingScore;
  }

  destroy(fn)
  {
    lessons.remove({_id: this._id}, true, ()=>fn());
  }

  static getByLessonId(lessonId, fn){
    lessonId = objectIDSafe(lessonId);
    lessons.findOne({_id: lessonId}, (e, lesson)=>{
      fn(lesson);
    });
  }

  static getByCourseId(courseId, fn)
  {
    courseId = objectIDSafe(courseId);
    lessons.find({courseId: courseId}).toArray((e, lessons)=>
    {
      fn(lessons);
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

module.exports = Lesson;

'use strict';

var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');

class User{
  constructor(obj){
    this.email = obj.email;
    this.password = obj.password;
    this.lastLessonId = '';
    this.passedLesson = [];
    this.passedCourses = [];
    this.storedQuestions = [];
  }

  create(fn){
    users.findOne({email:this.email}, (e,u)=>{
      if(u){
        var isMatch = bcrypt.compareSync(this.password, u.password);
        if(isMatch){
          fn(u);
        }else{
          fn(null);
        }
      }else{
        this.password = bcrypt.hashSync(this.password, 8);
        users.save(this, (e,u)=>{
          fn(u);
        });
      }
    });
  }

  login(fn){
    users.findOne({email:this.email}, (e,u)=>{
      if(u){
        var isMatch = bcrypt.compareSync(this.password, u.password);
        if(isMatch){
          fn(u);
        }else{
          fn(null);
        }
      }
    });
  }
}
module.exports = User;

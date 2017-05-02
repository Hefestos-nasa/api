var schedule = require('node-schedule');
var date = new Date('2017-04-29 22:11:59');

var j = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
})
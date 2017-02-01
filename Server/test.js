/**
 * Created by vjtc0n on 10/27/16.
 */
var moment = require('moment');

var thisDay = new Date().toISOString();

console.log(thisDay);

var thisDayMoment = moment(thisDay);

//console.log(thisDayMoment)

var date = thisDayMoment.date();
console.log(date);

var dayOfWeek = thisDayMoment.day();
console.log(dayOfWeek);

var month = thisDayMoment.month();
console.log(month);

var year = thisDayMoment.year();
console.log(year);

console.log('Thu 2 tuan nay');
var mondayOfWeek = thisDayMoment.millisecond(0).second(0).minute(0).hour(0).weekday(0)._d.toISOString();
console.log(mondayOfWeek);

if (thisDay > mondayOfWeek) {
  console.log('OK')
} else {
  console.log('Fail')
}


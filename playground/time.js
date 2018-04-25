const moment = require('moment');
//moment to format date
const createdAt =234;
var date = moment(createdAt);
// console.log(date.format('MM Do ,YYYY')); 

console.log(date.format('h:mm a'));
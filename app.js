
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const http = require('http');
const app = express();
 var server = http.createServer(app);
//setting up socket io
const socketIO = require('socket.io'); 
var io = socketIO(server);
app.use(express.static("."))
// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
  }));
  app.set('view engine', 'handlebars');

  app.get('/' , (req,res) => {
    res.render('layouts/main');
  })

  // Static folder
app.use(express.static(path.join(__dirname, 'public')));

//setting server
const port = process.env.PORT || 5000;

io.on('connection', (socket) => {
console.log('new user connected');

socket.emit('newMessage', {
  from : 'admin',
text: 'welcome to chat room',
createAt: new Date().getTime()

});
socket.broadcast.emit('newMessage', {
from: ' admin ',
text: 'new user connected',
createAt: new Date().getTime()

});
socket.on('createMessage', (message) => {
  console.log(`message from `,message );
 // ### io emits the event to all the user including the one who sends it  ###

  io.emit('newMessage', {  
  from :message.from,
  text :message.text,
  createAt: new Date().getTime()
  });
 // ### where as socket.broadcast emit event to all but except the one who sends it###
//  socket.broadcast.emit('newMessage',{
//     from: message.from,
//     text: message.text,
//     createAt: new Date().getTime()
//  })
});


socket.on('disconnect', () => {
  console.log('user was disconnected')
})
 });
server.listen(port, () => {
    console.log(`server started on port ${port}`)
})
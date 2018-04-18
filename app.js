
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
 var server = http.createServer(app);
//setting up socket io
const socketIO = require('socket.io');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { generateMessage } = require('./server/utils/message')
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

socket.emit('newMessage',generateMessage('admin', 'welcome to chat room'));
socket.broadcast.emit('newMessage', generateMessage( 'admin', 'new user connected'));
socket.on('createMessage', (message, callback) => {
  console.log(`message from `,message );
 
 // ### io emits the event to all the user including the one who sends it  ###

  io.emit('newMessage', generateMessage(message.from,message.text));
  callback();
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
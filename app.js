const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const {isRealString} = require('./server/utils/validation')
const {Users} = require('./server/utils/users');
const app = express();
 var server = http.createServer(app);
//setting up socket io
const socketIO = require('socket.io');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { generateMessage ,generateLocationMessage} = require('./server/utils/message')
var io = socketIO(server);
var users = new Users();
app.use(express.static("."))
// Handlebars Middleware
// app.engine('handlebars', exphbs({
//     defaultLayout: 'main'
//   }));
//   app.set('view engine', 'handlebars');
// Static folder
app.use(express.static(path.join(__dirname, 'public')));


  // app.get('/' , (req,res) => {
  //   res.render('indexasasd');
  // })

  

//setting server
const port = process.env.PORT || 5000;

io.on('connection', (socket) => {
console.log('new user connected');


socket.on('join', (params,callback) => {
  if(!isRealString(params.name) || !isRealString(params.room)){
   return callback('Name and room name are required ');
  }
  //joining particular room
  socket.join(params.room);
  users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
  //io.emit -> io.to(room name here)
  //socket.broadcast -> socket.broadcast.to(room name).emit
  io.to(params.room).emit('updateUserList', users.getUserList(params.room));
  socket.emit('newMessage',generateMessage('Admin', 'welcome to chat room'));
socket.broadcast.to(params.room).emit('newMessage', generateMessage( 'Admin', `${params.name} has joined`));
  callback();
});
socket.on('createMessage', (message, callback) => {
  var user = users.getUser(socket.id);

  if (user && isRealString(message.text)) {
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
  }

  callback();
});

 // ### io emits the event to all the user including the one who sends it  ###
 socket.on('createLocationMessage', (coords) => {
  var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));  
    }
  });



socket.on('disconnect', () => {
  var user = users.removeUser(socket.id);

  if (user) {
    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
  }
});
});
server.listen(port, () => {
    console.log(`server started on port ${port}`)
})
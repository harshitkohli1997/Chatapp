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

socket.on('createMessage', (message) => {
  console.log(`message from `,message );
  io.emit('newMessage', {
  from :message.from,
  text :message.text,
  createAt: new Date().getTime()
  });
});


socket.on('disconnect', () => {
  console.log('user was disconnected')
})
 });
server.listen(port, () => {
    console.log(`server started on port ${port}`)
})
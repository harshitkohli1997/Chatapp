const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const http = require('http');
const app = express();
 var server = http.createServer(app);
//setting up socket io
const socketIO = require('socket.io'); 
var io = socketIO(server);

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

socket.on('disconnect', () => {
  console.log('user was diconnected');
})
})
server.listen(port, () => {
    console.log(`server started on port ${port}`)
})
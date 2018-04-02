var socket = io();
socket.on('connect', () => {
  console.log('connected to server');
  socket.emit('newMessage', {
    from:'abc',
    at:'234'
  });
});
socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('createMessage', (message) => {
    console.log('message is',message);
})
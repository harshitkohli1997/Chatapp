
var socket = io();
socket.on('connect', () => {
  console.log('connected to server');

  // socket.on('welcome', () => {
  //   console.log(`${from}`)
  // })

});
socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', (message) => {
    console.log('message is',message);
    //using jquery to create modify and make element visible
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
})


//selecting the from and overwriting its it behaviour
jQuery('#message-form').on('submit',  (e) =>{
  e.preventDefault();
socket.emit('createMessage', {
  from:'scooby',
text: jQuery('[name=message]').val()

}, () => {
console.log('sent');
}) ;
});

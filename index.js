let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);


io.on('connection', (socket) => {
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    console.log("TicTacTo", "set-nickname: ", nickname);

    io.emit('users-changed', {user: nickname, event: 'joined'});    
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {index: message.index, from: socket.nickname}); 
    console.log("add-message, from  ", socket.nickname, ", index: ", message.index);
    ///
    var srvSockets = io.sockets.sockets;
    Object.keys(srvSockets).length; 
    console.log("Object.keys(srvSockets).length", Object.keys(srvSockets).length);   


       
  });

  ///
  socket.on('getcount', function(){
    console.log("on getcount");   

    //io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });
  ///
});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});
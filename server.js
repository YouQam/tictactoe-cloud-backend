let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);


io.on('connection', (socket) => {

  socket.on('disconnect', function () {
    io.emit('users-changed', { user: socket.xORo, event: 'left' });
  });

  socket.on('set-xORo', (xORo) => {
    socket.xORo = xORo;
    console.log("TicTacTo", "set-xORo: ", xORo);
    io.emit('users-changed', { user: xORo, event: 'joined' });
  });

  socket.on('add-movement', (message) => {
    io.emit('message', { index: message.index, from: socket.xORo });
    console.log("add-message, from  ", socket.xORo, ", index: ", message.index);

    /// Get count of players
    /* var srvSockets = io.sockets.sockets;
    Object.keys(srvSockets).length;*/
  });

  socket.on('send-play-again', (message) => {
    io.emit('trigger-play-again');
    console.log("play-again, message");
  });
  ///

});

var port = process.env.PORT || 3001;

http.listen(port, function () {
  console.log('listening in http://localhost:' + port);
});
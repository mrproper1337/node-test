module.exports = function (io) {

    io.on('connection', function(socket){
        socket.on('chat message', function(){
            io.emit('chat message');
        });
    });

};
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

//Serve listen port 8890
server.listen(8890);
io.on('connection', function (socket) {

    console.log("client connected");
    var redisClient = redis.createClient();
    redisClient.subscribe('message');

    redisClient.on("message", function (channel, data) {
        console.log("new message add in queue " + data['message'] + " channel");
        socket.emit(channel, data);
    });

    socket.on('disconnect', function () {
        redisClient.quit();
    });

});
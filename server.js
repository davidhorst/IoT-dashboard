const express = require('express');
const path    = require( 'path' );
const root    = __dirname;
const port    = 8000;
const app     = express();
const http = require('http');
var request = require('request');
const server = http.createServer(app);
const io = require("socket.io")(server);

var switches = {
    switch1: {name: "NodeMCU", status: false, ip: '10.1.10.96'},
    switch2: {name: "Living Room Lamp", status: false, ip: null},
    switch3: {name: "Bedroom Lamp", status: false, ip: null}
};

// Query exisiting switches for current status
for (mySwitch in switches){
    if (switches[mySwitch].ip){
        var tempSwitch = mySwitch;
        request(`http://${switches[tempSwitch].ip}/status`, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    result = JSON.parse(body);
                    console.log("status recieved from ", tempSwitch, ": ", result)
                    var tempBool
                    (result.status == 'true') ? tempBool = true : tempBool = false;
                    switches[tempSwitch].status = tempBool;
                    io.sockets.emit("switchStatus", switches);
                }
            })
    }
}


var handleClient = function (socket) {
    console.log("Client added: ", socket.id)
    socket.emit("switchStatus", switches);
    socket.on("toggleSwitch", function(switchCommand){
        request(`http://${switches[switchCommand.switch].ip}/toggle`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                result = JSON.parse(body);
                var tempBool
                (result.status == 'true') ? tempBool = true : tempBool = false; 
                switches[switchCommand.switch].status = tempBool;
                io.sockets.emit("switchStatus", switches);
            }
        })
    })
};

io.on('connection', handleClient);

// Static Files
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));

// Start Server
server.listen( port, function() {
  console.log( `server running on port ${ port }` );
});

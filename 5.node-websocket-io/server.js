const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
const io = require("socket.io")(server);

let users = [{}];
let connections = [];

// ###########Listen

server.listen(8080, err => {
    if (err) {
        console.log("Io server is down");
        return;
    }
    return console.log("Io server running on port 5000...");
});
// ###########Routes
app.use(express.static("client"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

// ###########Socket.io

var commonRoom = io.of("/common").on("connection", socket => {
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);

    socket.emit("common-room", {
        msg: "Messaged received by everybody",
        username: "Server"
    });

    socket.on("send-common-room-message", message => {
        console.log(message);
        socket.broadcast.emit("common-room", message);
    });

    socket.on("typingToServer", data => {
        socket.broadcast.emit("typing", data)
    })
});

var counterOnline = io.of("/counter").on("connection", socket => {
    setInterval(() => {
        socket.volatile.emit("count", {
            username: "Server",
            msg: "Have a wonderful day"
        });
    }, 60000);
});
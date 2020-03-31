const ws = require("ws");

const server = new ws.Server({
    port: 8080
}, (err) => {
    if (err) {
        console.log("server down");
        return;
    }
});

server.on("listening", ws => {
    console.log("server listening...")
})

broadcast = data => {
    server.clients.forEach(ws => {
        ws.send(data);
        console.log(data)
    });
};

server.on("connection", ws => {
    ws.on("message", data => {
        broadcast(data);
        // console.log(data);
    });
});
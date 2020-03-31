const connection = new WebSocket("ws://localhost:8080");
const box = document.getElementById("box");
const msg = document.getElementById("msg");
const name = document.getElementById("client-name");

connection.onopen = (e) => {
    console.log("connected");
    let p = document.createElement("p");
    p.textContent = "Connection is established. You can chat now.";
    box.appendChild(p);
}

connection.addEventListener("message", (e) => {
    let data = JSON.parse(e.data);
    console.log("data received from server(JSON string): " + e.data)
    let p = document.createElement("p");
    p.textContent = data.name + ": " + data.message;
    box.appendChild(p);
})

send = data => {
    if (connection.readyState === WebSocket.OPEN) {
        connection.send(JSON.stringify(data));
        console.log("data sent to server(JSON string): " +
            JSON.stringify(data));
    } else {
        console.log("could not send message")
    }
}

msg.addEventListener("keydown", e => {
    let kc = e.which || e.keyCode;

    if (kc === 13) {
        send({
            "message": msg.value,
            "name": name.value
        });
        msg.value = '';
    }
})
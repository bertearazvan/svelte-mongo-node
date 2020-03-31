var commonRoom = io.connect("http://localhost:8080/common");
var counter = io.connect("http://localhost:8080/counter");

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("msg");
const messageContainer = document.getElementById("box");
const usernameInput = document.getElementById("username");

messageForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = {
        msg: messageInput.value,
        username: usernameInput.value
    };
    appendMessage(message);
    commonRoom.emit("send-common-room-message", message);
    messageInput.value = "";
});

commonRoom.on("common-room", data => {
    console.log(data);
    appendMessage(data);
});

counter.on("count", data => {
    appendMessage(data);
});

commonRoom.on("typing", data => {
    console.log(data)
    
    if (data.typing) {
        console.log("typing");
    } else {
        console.log("stopped typing")
    }
})

appendMessage = message => {
    const messageElement = document.createElement("p");
    messageElement.innerText = message.username + ": " + message.msg;
    messageContainer.append(messageElement);
};

messageInput.addEventListener("keydown", e => {
    let kc = e.which || e.keyCode;

    if (kc === 13) {
        commonRoom.emit("typingToServer", false);
        send({
            "message": msg.value,
            "name": name.value
        });
        msg.value = '';
    } else if (kc !== 13) {
        commonRoom.emit("typingToServer", true);
    }
})
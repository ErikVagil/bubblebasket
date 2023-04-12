class Counter
{
    constructor()
    {
        this.configureWebSocket();
    }

    configureWebSocket()
    {
        const protocol = window.location.protocol === "http:" ? "ws" : "wss";
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) =>
        {
            this.displayConnected();
        };
        this.socket.onclose = (event) =>
        {
            this.displayDisconnected();
        };
    }

    displayConnected()
    {
        const messagesElement = document.querySelector(".messages-list");
        messagesElement.innerHTML = `<p class="message connected">Say hi to ${localStorage.getItem("userName")}!</p>` + messagesElement.innerHTML;
    }

    displayDisconnected()
    {
        const messagesElement = document.querySelector(".messages-list");
        messagesElement.innerHTML = `<p class="message disconnected">See you later, ${localStorage.getItem("userName")}!</p>` + messagesElement.innerHTML;
    }
}

const counter = new Counter();
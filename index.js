const express = require("express")
const app = express()
const http_port = 3000
const ws_port = 3002
const WebSocketServer = require('ws')
const wss = new WebSocketServer.Server({ port: ws_port })
let clients = []
const IDLE = 0
const CNT = 1
const ALARM = 2
let minutes = 0
let seconds = 5
let statuss = IDLE

wss.on("connection", ws => {
    clients.push(ws)
    console.log("new client connected")
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
        if (data.toString() === "+") {
            seconds += 30
            if (seconds >= 60) {
                seconds = seconds - 60
                minutes++
            }
            if (minutes >= 15) {
                seconds = 0
            }
            clients.forEach(client => { client.send(    ) })
        }
        if (data.toString() === "-") {
            seconds -= 30
            if (seconds < 0) {
                seconds = seconds + 60
                minutes--
            }
            if (minutes < 0) {
                seconds = 0
                minutes = 0
            }
        }
        console.log("Current minutes are:" + minutes)
        console.log("Current seconds are:" + seconds)
    })
    ws.on("close", () => {
        console.log("the client has disconnected")
        console.log("original numer of clients:" + clients.length)
        clients = clients.filter(client => ws != client)
        console.log("new numer of clients:" + clients.length)
    })
    ws.onerror = () => {
        console.log("Some error occurred")
    }
})
console.log(`The Websocket server is runnign on port ${ws_port}`)
app.set("view engine", "pug");

app.get("/", (req, res) => {
    console.log("hallo")
    res.render("home");
})

app.use(express.static("public"))

app.listen(http_port, () => {
    console.log(`Example app listening on port ${http_port}`)
})
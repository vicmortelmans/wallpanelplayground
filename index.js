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
let statuss = IDLE
let minutes = 0
let seconds = 5

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
                ws.send("flikkeren")
            }
            let time= {}
            time.minutes = minutes
            time.seconds = seconds
            clients.forEach(client => { client.send(JSON.stringify(time)) })
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
                ws.send("flikkeren")
            }
            let time= {}
            time.minutes = minutes
            time.seconds = seconds
            clients.forEach(client => { client.send(JSON.stringify(time)) })
        }
        console.log("Current minutes are:" + minutes)
        console.log("Current seconds are:" + seconds)

        if (data.toString()=== "start"){
            if (statuss!= CNT){
                statuss=CNT
                let timer= setInterval(() => {
                    if (minutes===0 && seconds===0){
                        clearInterval(timer)
                        clients.forEach(client => { client.send("audio") }) 
                        statuss=IDLE
                        return
                    }
                    if (seconds===0){
                        minutes--
                        seconds= seconds+60
                    }
                    seconds --
                    let time= {}
                    time.minutes = minutes
                    time.seconds = seconds
                    clients.forEach(client => { client.send(JSON.stringify(time)) })
                }, 1000);
            }
        }
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
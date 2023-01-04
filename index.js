const express = require("express")
const app = express()
const http_port=3000
const ws_port=3002
const WebSocketServer = require('ws')
const wss = new WebSocketServer.Server({port: ws_port})

wss.on("connection", ws=> {
    console.log("new client connected")
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
        ws.send("hello")
    })
    ws.on("close", () => {
        console.log("the client has disconnected")
    })
    ws.onerror= () =>{
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

app.listen(http_port, ()=>{
    console.log(`Example app listening on port ${http_port}`)
})
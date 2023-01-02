const express = require("express")
const app = express()
const port=3000
const WebSocketServer = require('ws')
const wss = new WebSocketServer.Server({port: 3001 })

wss.on("connection", ws=> {
    console.log("new client connected")
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
    })
    ws.on("close", () => {
        console.log("the client has disconnected")
    })
    ws.onerror= () =>{
        console.log("Some error occurred")
    }
})
console.log("The Websocket server is runnign on port 3001")
app.set("view engine", "pug");

app.get("/", (req, res) => {
    console.log("hallo")
    res.render("home");
})

app.use(express.static("public"))

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})
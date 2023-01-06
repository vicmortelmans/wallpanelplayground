const IDLE = 0
const CNT = 1
const ALARM = 2
let minutes = 0
let seconds = 5
let statuss = IDLE
let audio = new Audio("/audio/alarm.mp3")
const ws = new WebSocket(`ws://${location.hostname}:3002`)

function display_minutes_and_seconds() {
    document.getElementById("seconden").innerHTML = String(seconds).padStart(2, '0')
    document.getElementById("minuten").innerHTML = String(minutes).padStart(2, '0')
}
function flikkeren() {
    clearTimeout(blinking)
    document.getElementById("tijd").classList.add("blinking")
    var blinking = setTimeout(() => {
        document.getElementById("tijd").classList.remove("blinking")
    }, 1000);

}

ws.addEventListener("open", () => {
    console.log("We are connected")
    ws.send("How are you?")
})

ws.addEventListener('message', function (event) {
    if (event.data === "flikkeren") {
        flikkeren()
    }
    else if(event.data === "audio"){
        audio.play()
    }
    else {
        time = JSON.parse(event.data)
        seconds = time.seconds
        minutes = time.minutes
        console.log(event.data)
        display_minutes_and_seconds()
    }
})

display_minutes_and_seconds()
document.getElementById("plusje").addEventListener("click", () => {
    document.getElementById("tijd").classList.remove("blinking")
    ws.send("+")
})

document.getElementById("min").addEventListener("click", () => {
    document.getElementById("tijd").classList.remove("blinking")
    ws.send("-")
})

document.getElementById("startknop").addEventListener("click", () => {
    ws.send("start")
})


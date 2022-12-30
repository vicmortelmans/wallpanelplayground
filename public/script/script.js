const IDLE= 0
const CNT= 1
const ALARM= 2
let minutes= 0
let seconds= 5
let statuss= IDLE
let audio= new Audio("/audio/alarm.mp3")

function display_minutes_and_seconds(){
    document.getElementById("seconden").innerHTML= String(seconds).padStart(2, '0')
    document.getElementById("minuten").innerHTML= String(minutes).padStart(2, '0')
}
function flikkeren(){
    clearTimeout(blinking)
    document.getElementById("tijd").classList.add("blinking")
    var blinking= setTimeout(() => {
        document.getElementById("tijd").classList.remove("blinking")
    }, 1000);

}
display_minutes_and_seconds()
document.getElementById("plusje").addEventListener("click", ()=>{
    document.getElementById("tijd").classList.remove("blinking")
    seconds += 30
    if (seconds>=60){
        seconds = seconds-60
        minutes ++
    }
    if (minutes >= 15){
        seconds = 0
        flikkeren()
    }
    display_minutes_and_seconds()
    
})

document.getElementById("min").addEventListener("click", ()=>{
    document.getElementById("tijd").classList.remove("blinking")
    seconds -= 30
    if (seconds<0){
        seconds = seconds+60
        minutes --
    }
    if (minutes <= 0){
        seconds = 0
        minutes = 0
        flikkeren()
    }
    display_minutes_and_seconds()
})

document.getElementById("startknop").addEventListener("click", ()=>{
    if (statuss!= CNT){
        statuss=CNT
        let timer= setInterval(() => {
            if (minutes===0 && seconds===0){
                clearInterval(timer)
                audio.play()
                statuss=IDLE
                return
            }
            if (seconds===0){
                minutes--
                seconds= seconds+60
            }
            seconds --
            display_minutes_and_seconds()
        }, 1000);
    }
})


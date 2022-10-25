var img = document.getElementById("playbackImg")

let firstTime = true;

var h = window.innerHeight * 4
document.body.style.height = String(h)+"px"
var lastFrame = 0
var lastScrollY = 0

const scrollIndic = document.getElementsByClassName("scrollIndicator")[0]
const bg = document.getElementsByClassName("bg")[0]
window.onscroll = function(e){

    // console.log(e)
    var frame  = Math.ceil((window.scrollY * images.length / (h-window.innerHeight)))

    // loadFrame(framesLoadOffset+frame)

    var perc = window.scrollY / (h-window.innerHeight)
    scrollIndic.style.width = "calc("+String(perc)+"*100vw)"
    // if (frame == lastFrame) return;
    if (frame > images.length - 1) return;
    console.log(frame,images.indexOf(images[frame]))
    // lastFrame = frame
    lastScrollY = window.screenY
    img.src = images[frame].data
    if (frame == images.length - 1 || frame == images.length - 2){
        bg.style.display = "flex"
        // document.body.style.cursor = "none"
        if (firstTime){
            img.src = images[69].data
            document.body.style.overflowY = "hidden"
            helpAnim()
            firstTime = false;
        }
        else{
            canWrite = true
        }
    }
    else{
        // document.body.style.cursor = 'url("pointer.png"),default'
        bg.style.display = "none"
        canWrite = false
    }
}
var images = []
function load(){
    for (let i = 1; i <= 350;i+=5){
        // let imgName = String("0".repeat(4-String(i).length))+String(i)+".png"
        loadFrame(i)

        console.log(i)
    }
    // await fetch("https://raw.githubusercontent.com/SimeDev42/Website/master/images/0350.png").then(response => response.blob())
    //     .then(imageBlob => {
    //         var imageObjectURL = URL.createObjectURL(imageBlob);
    //         images[70] = imageObjectURL
    //         // console.log(imageObjectURL);
    // });
}

function order(){
    images.sort((a,b) =>{
        return a.index - b.index
    })
    console.log("Ordered")
}

var pBar = document.getElementsByClassName("progressBar")[0]

var percLoaded = 0

function updateProgressBar(){
    percLoaded+=(1/70*100)
    pBar.style.width = String(percLoaded)+"%"
}

async function loadFrame(frameN){

    frameN = Number(frameN)
    let imgName = String("0".repeat(4-String(frameN).length))+String(frameN)+".png"
    await fetch("https://raw.githubusercontent.com/SimeDev42/Website/master/images/"+imgName).then(response => response.blob())
    .then(imageBlob => {
        var imageObjectURL = URL.createObjectURL(imageBlob);
        images.push({index:(frameN-1)/5,data:imageObjectURL})
        // console.log(imageObjectURL);
    });
    console.log("Loaded",frameN)
    updateProgressBar()
    if (images.length == 70){
        console.log("Loaded!")
        document.body.style.overflowY = "scroll"
        document.body.removeChild(document.getElementsByClassName("loading")[0])
        order()
    }
}

load()
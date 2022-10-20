var img = document.getElementsByTagName("img")[0]

let firstTime = true;

var h = window.innerHeight * 4
console.log(h)
document.body.style.height = String(h)+"px"
var lastFrame = 0
var lastScrollY = 0
window.onscroll = function(e){
    // console.log(e)
    var frame  = Math.floor((window.scrollY * images.length / (h-window.innerHeight)))
    if (frame == lastFrame) return;
    if (frame > images.length - 1) return;
    console.log(frame)
    lastFrame = frame
    lastScrollY = window.screenY
    console.log(images.indexOf(images[frame]))
    img.src = images[frame]
    if (frame == images.length - 1){
        terminal.style.display = "block"
        if (firstTime){
            document.body.className = "noScroll"
            helpAnim()
            firstTime = false;
        }
        else{
            canWrite = true
        }
    }
    else{
        terminal.style.display = "none"
        canWrite = false
    }
}
var images = []
async function load(){
    for (let i = 1; i <= 350;i+=5){
         await fetch("/images/"+String("0".repeat(4-String(i).length))+String(i)+".png").then(response => response.blob())
        .then(imageBlob => {
            var imageObjectURL = URL.createObjectURL(imageBlob);
            images.push(imageObjectURL)
            // console.log(imageObjectURL);
        });
    
    }
    await fetch("/images/0350.png").then(response => response.blob())
        .then(imageBlob => {
            var imageObjectURL = URL.createObjectURL(imageBlob);
            images.push(imageObjectURL)
            // console.log(imageObjectURL);
        });
    console.log("Loaded!")
}

load()
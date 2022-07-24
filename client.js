
const ws = new WebSocket("wss:/127.0.0.1:8080");
/*"ws://localhost:8081"*/
ws.addEventListener("open", () => {
    console.log("alive I am");
    
});
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
var rects = [];
var xoo;
xoo = getRandomArbitrary(0,1001);
var yo ;
yo = 200;
var myOwnID = 0;
rects.push([xoo,yo]);
var Leftwalk = 0;
var Rightwalk = 0;
var Upwalk = 0;
var Downwalk = 0;

ws.addEventListener("message", message => {
    
    messaju = JSON.parse(message.data);
    if (messaju.id){
        myOwnID = messaju.id;
    }
    else{
        
        if (messaju.first != myOwnID){
            rects.push([messaju.x,messaju.y]);
            //console.log(messaju.x,messaju.y);
        }
        
    }
    
    
});
window.addEventListener('keypress',(event) =>{
    if (event.key == "a"){
        Leftwalk = 1;
    }
    if (event.key == "d"){
        Rightwalk = 1;
    }
    if (event.key == "w"){
        Upwalk = 1;
    }
    if (event.key == "s"){
        Downwalk = 1;
    }
    
})
window.addEventListener('keyup',(event) =>{
    if (event.key == "a"){
        Leftwalk = 0;
    }
    if (event.key == "d"){
        Rightwalk = 0;
    }
    if (event.key == "w"){
        Upwalk = 0;
    }
    if (event.key == "s"){
        Downwalk = 0;
    }
    
})
window.addEve
window.addEventListener('click', () => {
    
    
  });
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.rect(xoo, yo, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
    if (Rightwalk){
        xoo+=5;
    }
    if (Leftwalk){
        xoo-=5;
    }
    if (Upwalk){
        yo-=5;
    }
    if (Downwalk){
        yo+=5;
    }
    if (ws.readyState == ws.OPEN){
        ws.send(JSON.stringify({
            x: xoo,
            y: yo,
            id: myOwnID}
            ));
    }
    
    if ( rects.length>5){
        rects = [rects[3],rects[4],rects[5]]
    }
    for (let i=0;i<rects.length;i++){
        console.log("Rect: " + rects[i][0], rects[i][1]);
        ctx.beginPath();
        ctx.rect(rects[i][0], rects[i][1], 50, 50);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    };
};
setInterval(draw,12);

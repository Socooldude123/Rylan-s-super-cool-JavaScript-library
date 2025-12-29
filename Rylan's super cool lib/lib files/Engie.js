document.body.style.padding = "0px";
document.body.style.margin = "0px";

//board
let board;
let ctx;
function createBoard(width,height){
    const canvas = document.createElement("canvas");
    canvas.id = "board";
    document.body.insertBefore(canvas,document.body.firstChild);
    board = document.getElementById("board");
    board.style.position = "absolute";
    ctx = board.getContext("2d");
    board.width = width;
    board.height = height;
}

function moveBoard(x,y){
    board.style.left = `${x}px`;
    board.style.top = `${y}px`;
}

function boardWidth(){
    return(board.width);
}
function boardHeight(){
    return(board.height);
}

//camera and mouse
const camera = {
  x : 0,
  y : 0
}
//mouse object
const mouse = {
  x : 0,
  y : 0,
  worldX : 0,
  worldY : 0
}
let isClicking = false; 
let mouseStart = { x : 0, y : 0 }

//checks if the mouse went down
document.addEventListener("mousedown", (e) => {
  isClicking = true;
  //sets mouse starting coordinates
  mouseStart.x = e.clientX;
  mouseStart.y = e.clientY;
});
document.addEventListener("mousemove", (e) => {
  //makes shure the player is clicking
  if(isClicking){
    //calculates how far the mouse moved on x and y axis
    let deltaX = e.clientX - mouseStart.x;
    let deltaY = e.clientY - mouseStart.y;
    //moves camera 
    camera.x -= deltaX;
    camera.y -= deltaY;
    //resets mouse satarting coordinates
    mouseStart.x = e.clientX;
    mouseStart.y = e.clientY;
  }
  //mouse world position
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  mouse.worldX = e.clientX + camera.x;
  mouse.worldY = e.clientY + camera.y;
});
//checks if the player releases the mouse button
document.addEventListener("mouseup", (e) => {
  isClicking = false;
});

//vectors
class Vector2{
    constructor(x,y){
        this.x = x,
        this.y = y
    }

    add(Vector2){
        this.x += Vector2.x;
        this.y += Vector2.y;
    }

    sub(Vector2){
        this.x -= Vector2.x;
        this.y -= Vector2.y;
    }

    mult(Number){
        this.x = this.x * Number;
        this.y = this.y * Number; 
    }

    div(Number){
        this.x = this.x / Number;
        this.y = this.y / Number;
    }

    mag() {
        return sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let m = this.mag();
        if (m > 0) {
            this.div(m);
        }
    }

    dist(Vector2){
        let a = this.x - Vector2.x;
        let b = this.y - Vector2.y;

        return(Math.sqrt(a * a + b *b));
    }
}

//sound
function playSound(sound){
    const audio = new Audio(sound);
    audio.play()
}

//math
const PI = Math.PI;
const HALF_PI = PI/2
const TWO_PI = 2 * PI;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function exponent(num,power){
    let n = num;
    for(let i = 2; i <= power; i++){
        n = n * num;
        if(i == power){
            return(n);
        }
    }
}

function dist(a,b){
    return(Math.sqrt(exponent(a,2) + exponent(b,2)));
}

function polarCoordinates(angle,distance,middleX,middleY){ //x = r * cos(θ) and y = r * sin(θ)
    let x = distance * Math.cos(angle);
    let y = distance * Math.sin(angle);
    if(!middleX || !middleY){
        middleX = 0;
        middleY = 0;
    }
    return({x : x + middleX, y : y + middleY});
}

function degreesToRadians(degrees){ //Radians = Degrees * (PI / 180)
    return(degrees * (PI / 180));
}

function radiansToDegrees(radians){ //Degrees = Radians * (180 / PI)
    return(radians * (180 / PI));
}

function lerp(value1,value2,amt){ 
    return(value1 + (value2 - value1) * amt);
}

//drawing
let Stro = false;
let cam = false;

function useCamera(bool){
    if(bool){
        cam = true;
    }
    else{
        cam = false;
    }
}

function useStroke(bool){
    Stro = bool;
}

function background(color){
    ctx.fillStyle = color;
    ctx.fillRect(0,0,board.width,board.height);
}

function strokeSize(Size){
    ctx.lineWidth = Size;
}

function rect(x,y,width,height,angle,color){
    if(!angle){
        angle = 0;
        color = "#000000";
    }
    if(!color){
        color = "#000000";
    }
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * (Math.PI / 180)); // Radians = Degrees × (Math.PI / 180)
    ctx.fillStyle = color;
    if(cam){
        ctx.fillRect((-width / 2) - camera.x, (-height / 2) - camera.y, width, height);
        if(useStroke){
            ctx.strokeRect((-width / 2) - camera.x, (-height / 2) - camera.y, width, height);
        }
    }
    else{
        ctx.fillRect((-width / 2), (-height / 2), width, height);
        if(useStroke){
            ctx.strokeRect((-width / 2), (-height / 2), width, height);
        }
    }
    ctx.restore();
}

function circle(x,y,diameter,color){
    ctx.beginPath();
    if(cam){
        ctx.arc(x - camera.x, y - camera.y, diameter/2, 0, TWO_PI);
    }
    else{
        ctx.arc(x, y, diameter/2, 0, TWO_PI);
    }
    if(!color){
        color = "#000000";
    }
    ctx.fillStyle = color;
    ctx.fill();
    if(useStroke){
        ctx.stroke();
    }
}

function line(x1,y1,x2,y2,color){
    if(!color){
        color = "#000000";
    }
    ctx.strokeStyle = color;
    ctx.beginPath();
    if(cam){
        ctx.moveTo(x1 - camera.x, y1 - camera.y);
        ctx.lineTo(x2 - camera.x, y2 - camera.y);
    }
    else{
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
    }
    ctx.stroke();
}

function text(str,x,y,size,color,maxWidth){
    ctx.font = `${size}px sans-serif`;
    if(!color){
        color = "#000000";
    }
    ctx.fillStyle = color;
    if(cam){
        ctx.fillText(str,x - camera.x,y - camera.y,maxWidth);
    }
    else{
        ctx.fillText(str,x,y,maxWidth);
    }
}

function image(img,x,y,width,height,angle){
    if(!angle){
        angle = 0;
    }
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * (Math.PI / 180)); // Radians = Degrees × (Math.PI / 180)
    if(!width){
        width = img.width;
    }
    if(!height){
        height = img.height;
    }
    if(cam){
        ctx.drawImage(img, (-width / 2) - camera.x, (-height / 2) - camera.y, width, height);
    }
    else{
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
    }
    ctx.restore();
}
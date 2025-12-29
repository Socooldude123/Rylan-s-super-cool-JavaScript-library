const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
createBoard(windowWidth,windowHeight);

const Wid = boardWidth();
const Hei = boardHeight();

setInterval(update,1000/60);

const testImage = new Image();
testImage.src = "../lib files/testImg.png";

useCamera(true);

function update(){
    background("#c5c5c5ff");
    useCamera(true);
    image(testImage,550,100,100,100);
    rect(100,100,100,100);
    circle(250,100,100);
    strokeSize(5);
    line(350,50,450,150);  
    useCamera(false);
    text("Mouse X: " + mouse.x, 100, 200, 20);
    text("Mouse Y: " + mouse.y, 300, 200, 20);
}
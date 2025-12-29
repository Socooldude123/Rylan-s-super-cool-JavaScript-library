//camera object
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
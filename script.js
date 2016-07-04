// JavaScript code goes here
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
//         ctx.fillSyle="#FF000";
ctx.fill();
ctx.closePath();

function drawRect(x,y,width,height,color){

    ctx.beginPath();
    ctx.rect(x,y,width, height);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

}
function drawCircle(circle){

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.rad, 0, Math.PI*2, false);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}
drawCircle(100,100,15,"green");


var circ = new Object();
circ.x = 30;
circ.y = 30;
circ.vx = .6;
circ.vy = .2;
circ.rad = 15;
circ.color="blue";

var l = [];
l[0] = circ;

for(var i = 0; i < 2; i++){
    l[i] = generateCircle();
}

var paddle = new Object();
paddle.w = 50;
paddle.h = 10;
paddle.x = canvas.width / 2  - paddle.w / 2 ;
paddle.y = canvas.height   - paddle.h  - 10;

function drawLoop(){
    // clear
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawRect(paddle.x, paddle.y, paddle.w, paddle.h);
    // move
    for (var i = 0; i < l.length;  i++){
        circ = l[i];
        circ.x += circ.vx;
        circ.y += circ.vy;

        circ.x+=circ.vx;
        circ.y+=circ.vy;

        drawCircle(circ);

        bounce(circ);
        gravity(circ);
        for(var j = 0; j < l.length; j++){
            if(j != i){
                circb = l[j];
                collide(circ, circb);
            }
        }
    }

}
function gravity(circ){
    if(circ.vy != 0)
        circ.vy = circ.vy + .05;
    if(circ.vy < .1  && circ.vy*-1 < .1 && canvas.height - circ.y-circ.rad < 0){
        circ.vy = 0;
    }
}
function bounce(circ){
    if(circ.x-circ.rad+circ.vx < 0 || circ.x+circ.rad+circ.vx > canvas.width){
        //reverse direction
        circ.vx = -circ.vx *.9;

    }
    if(circ.y-circ.rad+circ.vy < 0 || circ.y+circ.rad + circ.vy > canvas.height){
        //reverse direction
        circ.vy = -circ.vy *.9;

    }

}
// determine if circle a and b collide
function collide(a,b){
    // check if overlap
    var d = a.rad +  b.rad  ; // sum of radius
    var disx = a.x + a.vx - b.x -b.vx ;
    var disy = a.y + a.vy - b.y -b.vy ;

    var distance = Math.sqrt(disx * disx + disy * disy);

    if(distance < d){
        // do collision
        // for now draw a box

        a.vx = -a.vx;
        b.vx = -b.vx;
    }
}
function makeCircle(x,y,vx,vy,rad,r,g,b){
    var circb = new Object();
    circb.x = x;
    circb.y = y;
    circb.vx = vx;
    circb.vy = vy;
    circb.rad = rad;
    //circb.color = "rgb({0},{1},{2})".format(r,g,b);
    circb.color = "blue";
    return circb;
}
function generateCircle(){
    var speedCap = 7;
    // pos
    var x = (Math.random() ) * (canvas.width - 20) + 10;
    var y = (Math.random() ) * (canvas.height - 20) + 10;
    // speed
    var vx = (Math.random()-.5) * speedCap;
    var vy = (Math.random()-.5) * speedCap;
    // color
    var r = Math.random() * 250;
    var g = Math.random() * 250;
    var b = Math.random() * 250;
    return makeCircle(x,y,vx,vy,10,r,g,b);


}
document.onkeypress =
    function test(){

         // switch(event.keyCode){

         // }
     };






$(document).keydown(function(e) {
    switch(e.which) {
    case 37: // left
        //  alert("left");
        paddle.x = paddle.x - 10;
        break;

    case 38: // up
        // alert("up");

        break;

    case 39: // right
        paddle.x = paddle.x + 10;

        // alert("right");
        break;

    case 40: // down
        // alert("down");
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
alert("this is a test");
    // draw loop
    setInterval(drawLoop, 1);

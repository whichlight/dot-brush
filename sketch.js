'use strict';
var h;
var w;


var past;
var now;
var col;
var newgesture = true;
var endgesture = true;
var touched = false;
var autodrawinit = true;
var bcol;



var setup = function(){
  colorMode(HSB, 360,1,1)
    createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  col = color(0,0,1);
  w = windowWidth;
  h = windowHeight;

  //disable default touch events for mobile
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", pdefault, false);
  el.addEventListener("touchend", pdefault, false);
  el.addEventListener("touchcancel", pdefault, false);
  el.addEventListener("touchleave", pdefault, false);
  el.addEventListener("touchmove", pdefault, false);

  past = createVector(0, 0);

  var cols = [[350,60],[240,10], [300,180]];
  var tcol = cols[floor(random(cols.length))];

  bcol =color(tcol[0],1,1);
  col = color(tcol[1],1,1);


  /*
  bcol =color(0,0,0);
  col = color(0,0,1);
  */
  background(bcol);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function pdefault(e){
  e.preventDefault()
}

var touchStarted= function(){
  newgesture = true;
  touched = true;
  return false;
}

var touchMoved= function(){
  pressed(touchX,touchY);
  return false;
}

var touchEnded= function(){
  pressed(touchX,touchY);
  endgesture = true;
  var dist = now.dist(past);
  if(dist==0){
   background(bcol);
  }

  return false;
}

var initCover = function(){
  var recw = 20;
  var numr = h/recw;

  background(0,0,0);
  for(var i =0; i<numr;i++){
    stroke(0,0,1);
    fill(0,0,1);
    rect(0,recw*i,w,recw/2)
  }
}

var pressed= function(x,y){
  now = createVector(x,y);
  if(newgesture){
    past = now;
    past.p1 = createVector(0,0);
    past.p2 = createVector(0,0);
    past.n1= createVector(0,0);
    past.n2= createVector(0,0);
    past.r = 0;
    newgesture = false;

  }
  drawCircle(now);
}


var drawCircle = function(now){
  var diffv = p5.Vector.sub(now,past).mult(0.4);
  var now= p5.Vector.add(diffv,past);
  var dist = diffv.mag();
  var r = dist/1.5;

  if(dist==0 && past.r!=0){
      console.log(r + "," + past.r);
      dist = 15;
    //  r= past.r;
    //  dist = 1.5*r;
  }
  if(dist>10){
    now.r = r;
    //line(now.x,now.y,past.x, past.y)
    strokeWeight(2);

    //perpendicular
    var n1 = createVector(-1*diffv.y, diffv.x);
    var n2 = createVector(diffv.y, -1*diffv.x);


    if(n1.mag()==0){
      console.log('zero');
      n1 = past.n1;
      n2 = past.n2;
      console.log(n1);
    }

    now.n1 = n1;
    now.n2 = n2;

    var numDots =2;

    stroke(0,0,0);

    strokeWeight(2);

    for(var i=1; i<numDots; i++){
    var p1 = p5.Vector.add(now,n1.normalize().mult(1.5*r*i));
    var p2 = p5.Vector.add(now,n2.normalize().mult(1.5*r*i));

    fill(col);
    stroke(col);
    ellipse(p1.x,p1.y,r,r)

    fill(col);
    stroke(col);
    ellipse(p2.x,p2.y,r,r)


    }


   fill(col);
    stroke(col);
    ellipse(now.x,now.y,r,r);


    /*

       fill(col);
    stroke(color(1,1,1));
    ellipse(now.x,now.y,5,5);

    noFill();
    stroke(col);
    line(now.x,now.y,past.x,past.y);
    */





    //shift in time
    past = now;
  }
}


function Rake(){
}

var draw = function(){
  if(touchIsDown || mouseIsPressed){
    if(endgesture){
      newgesture = true;
      endgesture = false;
    }
  }

}


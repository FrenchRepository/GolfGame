var canvas = document.getElementById("myCanvas");
canvas.style.border = "saddlebrown 20px solid";


/*
Nombre de coup 
*/
var nombreCoups = 0;
/*
Victoire 
*/
var victoire = 0;
var STATUT = 1;
var speed = 0.04;
var color = "white";
/*
----------------------------------------------------------------------------------
Dessine la balle
----------------------------------------------------------------------------------
*/
//Balle
var ctx = canvas.getContext("2d");
var ballRadius = 10
var x = 15; //Position x
var y = 15; //Position y
var dx = 0; //variable pour que la balle bouge
var dy = 0; //variable pour que la balle bouge

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;//"white";
    ctx.fill();
    ctx.closePath();
}


/*
----------------------------------------------------------------------------------
Gestion du trou
----------------------------------------------------------------------------------
*/
var trou = canvas.getContext('2d');
function drawTrou(x,y){
  trou.beginPath();
  //50 , 350
  trou.arc(x, y, ballRadius+5, 0, Math.PI*2);
  trou.fillStyle = "black";
  trou.fill();
  trou.closePath();
}

function trouIn(tx,ty){
  if(x < tx + ballRadius+5 && x > tx-ballRadius && y < ty + ballRadius+5 && y > ty - ballRadius){
    console.log("in");
    //Faire disparaitre la ball
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dx = 0;
    dy = 0;

    //Victoire
    victoire = 1;
    if(victoire==1){
     document.getElementById("victoire").innerHTML="VICTOIRE";
    }
  }
}
/*
----------------------------------------------------------------------------------
Gestion des obstacles
----------------------------------------------------------------------------------
*/
var obstacle = canvas.getContext('2d');

function drawRec( x, y, largeur, longueur){
  obstacle.beginPath();
  obstacle.fillStyle = 'saddlebrown'; //Nuance de bleu
  obstacle.fillRect(x, y, largeur, longueur);
  //obstacle.fillRect(80, 25, 200, 100);
  obstacle.closePath();
}

var SPobstacle = canvas.getContext('2d');
function drawRecSpecial( x, y, largeur, longueur){
  if(STATUT == 1){
    SPobstacle.beginPath();
    SPobstacle.fillStyle = 'red'; //Nuance de bleu
    SPobstacle.fillRect(x, y, largeur, longueur);
    //obstacle.fillRect(80, 25, 200, 100);
    SPobstacle.closePath();
  }
}


/*
* Obsx = position x de l'obstacle
* Obsy = position y de l'obstacle
* largeur = largeur de l'obstacle
* longueur = longueur de l'obstacle
*/
function collisionDetectionDX(Obsx, Obsy, largeur, longueur){
  //position x du rec, + largeur --> 200
  //20position y du rec, + longueur --> 100
  //80,25,200,100
  if(x +dx> Obsx && x +dx  < Obsx+largeur && y > Obsy && y < Obsy+longueur){
    dx = -dx;
  }
}
function collisionDetectionDY(Obsx, Obsy, largeur, longueur){
  if(x > Obsx && x < Obsx+largeur && y+dy > Obsy && y +dy < Obsy+longueur){
    dy = -dy;
  }  
}

function collisionDetectionSP(Obsx, Obsy, largeur, longueur){
  if(STATUT == 1){
    if(x > Obsx && x < Obsx+largeur && y > Obsy && y < Obsy+longueur) {
      dy = -dy;
      STATUT = 0;
    }
  }
}
/*
 ----------------------------------------------------------------------------------
Gestion de la jauge de puissance
----------------------------------------------------------------------------------
*/
//Idée
var jauge = canvas.getContext("2d");
function drawJauge(){
  var triangle = {
    x1: x, //Position de la balle x
    y1: y, //Position de la balle y
    x2: souris.memX, 
    y2: souris.memY, 
    x3: souris.x, 
    y3: souris.y
}
jauge.strokeStyle = 'red';

jauge.beginPath();
jauge.moveTo(triangle.x1, triangle.y1);
jauge.lineTo(triangle.x2, triangle.y2);
jauge.lineTo(triangle.x3, triangle.y3);
jauge.lineTo(triangle.x1, triangle.y1);
jauge.closePath();
jauge.stroke();
}

/*
----------------------------------------------------------------------------------
Gestion de la souris
----------------------------------------------------------------------------------
*/
var souris = { x: 0, y: 0, memX: 0, memY: 0 };
//Puissance de la balle
var puissance = 0;

//Mouvement de la souris
canvas.addEventListener("mousemove", posSouris);
canvas.addEventListener("mousedown", appuye);
canvas.addEventListener("mouseup", relacher);

function posSouris(info){
  //offSet fournit decalage sur l'axe
  souris.x = info.offsetX;
  souris.y = info.offsetY;
}

function appuye(info){
  //Position de la souris quand c'est préssé
  souris.memX = souris.x;
  souris.memY = souris.y;

  //Faire la jauge de puissance du tir
  // peut etre
  //drawJauge();

  console.log("j'appuie sur la souris");
}

function relacher(info){
  //Position de la souris quand c'est relaché
    //Postion de la souris - la positon de la souris quand c'est préssé * la puissance de la balle
    var dx2 = (souris.memX - souris.x) * speed;//0.04;
    console.log(dx2);
    console.log(speed);
    var dy2 = (souris.memY - souris.y) * speed;//0.04;
  
    //Déplacer la balle
    dx = dx2;
    dy = dy2;
    console.log("je relache la souris");

    //Augmenter le nombre de coups
    nombreCoups = nombreCoups + 1;
    document.getElementById("nbCoups").innerHTML=nombreCoups;
}


/* Affiche le canvas et les niveaux */
function jouer(){
  document.getElementById('myCanvas').style.visibility='visible';
  document.getElementById('liste').style.visibility='visible';
  document.getElementById('coups').style.visibility='visible';

  //Animation bouton
  document.querySelector(".voiture").className = "voiture";
  window.requestAnimationFrame(function(time) {
    window.requestAnimationFrame(function(time) {
  document.querySelector(".voiture").className = "voiture changing";
    });
  });

}
document.querySelector(".btnStart").addEventListener("click",jouer,false);


/*
  Creation des maps
 */
function map1(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //La balle
  drawBall();
  drawTrou(50,470);
  trouIn(50,470)

  drawRec(100,0,20,200);
  collisionDetectionDX(100,0,20,200);
  collisionDetectionDY(100,0,20,200);

  drawRec(40,200,80,20);
  collisionDetectionDX(40,200,80,20);
  collisionDetectionDY(40,200,80,20);

  drawRec(0,300,300,20);
  collisionDetectionDX(0,300,300,20);
  collisionDetectionDY(0,300,300,20);

  drawRec(300,80,20,240);
  collisionDetectionDX(300,80,20,240);
  collisionDetectionDY(300,80,20,240);

  drawRec(300,200,140,20);
  collisionDetectionDX(300,200,140,20);
  collisionDetectionDY(300,200,140,20);

  drawRec(470,200,140,20);
  collisionDetectionDX(470,200,140,20);
  collisionDetectionDY(470,200,140,20);

  drawRec(250,310,20,100);
  collisionDetectionDX(250,310,20,100);
  collisionDetectionDY(250,310,20,100);

  drawRec(150,400,20,100);
  collisionDetectionDX(150,400,20,100);
  collisionDetectionDY(150,400,20,100);

  

   //--> arret de la balle
   if( !(dy <= 0.07 && dy >= -0.07)){ //quand la balle doit s'arreter
    dy = dy * 0.99;
    y += dy; //déplace sur l'axe y
  }
  if( !(dx <= 0.07 && dx >= -0.07)){//quand la balle doit s'arreter
    dx = dx * 0.99;
    x += dx;//déplace sur l'axe x
  }

  //Gere les rebonds par rapport au canvas
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
}

/*
----------------------------------------------------------------------------------
Dessine les éléments sur le canvas
----------------------------------------------------------------------------------
*/
function map2() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //La balle
  drawBall();
  //Le trou
  drawTrou(50,350);
  trouIn(50,350)
  //Obstacle
  //(x,y,longeur,largeur)
  drawRec(0,70,400,20);
  collisionDetectionDX(0,70,400,20); //La 3e valeur colision la balle
  collisionDetectionDY(0,70,400,20);

  drawRec(380,90,20,200);
  collisionDetectionDX(380,90,20,200);
  collisionDetectionDY(380,90,20,200);
   

  drawRec(380,290,160,20);
  collisionDetectionDX(380,290,160,20);
  collisionDetectionDY(380,290,160,20);
  

  drawRec(130,150,20,270);
  collisionDetectionDX(130,150,20,270);
  collisionDetectionDY(130,150,20,270);
   
  

  drawRec(0,400,270,20);
  collisionDetectionDX(0,400,270,20);
  collisionDetectionDY(0,400,270,20);
   
  //drawJauge();
  //Déplacement sur x et y
  //x += dx;
  //y += dy;

  //--> arret de la balle
  if( !(dy <= 0.07 && dy >= -0.07)){ //quand la balle doit s'arreter
    dy = dy * 0.99;
    y += dy; //déplace sur l'axe y
  }
  if( !(dx <= 0.07 && dx >= -0.07)){//quand la balle doit s'arreter
    dx = dx * 0.99;
    x += dx;//déplace sur l'axe x
  }

  //Gere les rebonds par rapport au canvas
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
}

function map3(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //La balle
  drawBall();
  //Le trou
  drawTrou(500,470);
  trouIn(500,470);

  drawRec(0,80,60,20);
  collisionDetectionDX(0,80,60,20);
  collisionDetectionDY(0,80,60,20);

  drawRec(80,0,20,70);
  collisionDetectionDX(80,0,20,70);
  collisionDetectionDY(80,0,20,70);

  drawRec(240, 0,20,200);
  collisionDetectionDX(240, 0,20,200);
  collisionDetectionDY(240, 0,20,200);

  drawRec(20, 180,220,20);
  collisionDetectionDX(20, 180,220,20);
  collisionDetectionDY(20, 180,220,20);

  drawRec(0, 270,130,20);
  collisionDetectionDX(0, 270,130,20);
  collisionDetectionDY(0, 270,130,20);

  drawRec(240, 200,20,275);
  collisionDetectionDX(240, 200,20,275);
  collisionDetectionDY(240, 200,20,275);

  drawRec(110, 340,130,20);
  collisionDetectionDX(110, 340,130,20);
  collisionDetectionDY(110, 340,130,20);

  drawRec(0, 410,130,20);
  collisionDetectionDX(0, 410,130,20);
  collisionDetectionDY(0, 410,130,20);

  //Obstacle destructible
  drawRecSpecial(130,270,110,20);
  collisionDetectionSP(130,270,110,20);


  drawRec(430, 30,20,470);
  collisionDetectionDX(430, 30,20,470);
  collisionDetectionDY(430, 30,20,470);

  drawRec(260, 410,130,20);
  collisionDetectionDX(260, 410,130,20);
  collisionDetectionDY(260, 410,130,20);

  drawRec(300, 300,130,20);
  collisionDetectionDX(300, 300,130,20);
  collisionDetectionDY(300, 300,130,20);

  drawRec(300, 100,130,20);
  collisionDetectionDX(300, 100,130,20);
  collisionDetectionDY(300, 100,130,20);

  drawRec(250, 200,130,20);
  collisionDetectionDX(250, 200,130,20);
  collisionDetectionDY(250, 200,130,20);

  //"Poteaux"
  var a = 455;
  for (var i=0; i < 4; i++){
      drawRec(a-10,400,20,20);
      collisionDetectionDX(a-10, 400,20,20);
      collisionDetectionDY(a-10, 400,20,20);
      drawRec(a+10,365,20,20);
      collisionDetectionDX(a+10, 365,20,20);
      collisionDetectionDY(a+10, 365,20,20);
      drawRec(a-10,330,20,20);
      collisionDetectionDX(a-10,330,20,20);
      collisionDetectionDY(a-10,330,20,20);
      drawRec(a+10,295,20,20);
      collisionDetectionDX(a-10,295,20,20);
      collisionDetectionDY(a-10,295,20,20);
      a = a + 40;
  }
  
   //--> arret de la balle
   if( !(dy <= 0.07 && dy >= -0.07)){ //quand la balle doit s'arreter
    dy = dy * 0.99;
    y += dy; //déplace sur l'axe y
  }
  if( !(dx <= 0.07 && dx >= -0.07)){//quand la balle doit s'arreter
    dx = dx * 0.99;
    x += dx;//déplace sur l'axe x
  }

  //Gere les rebonds par rapport au canvas
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

}


/*
----------------------------------------------------------------------------------
Lancement des niveaux
----------------------------------------------------------------------------------
*/
var myInterval;
function niveau1(){
  stop();
  myInterval = setInterval(map1,16);
}
function niveau2(){
  stop();
  myInterval = setInterval(map2, 16);
}
function niveau3(){
  stop();
  myInterval = setInterval(map3, 16);
}
function balle1(){
  stop();
  speed = 0.09;
  color = "red";
}
function balle2(){
  stop();
  speed = 0.06;
  color = "blue";
}
function balle3(){
  stop();
  speed = 0.04;
  color = "black";
}
function balleDefaut(){
  stop();
  speed = 0.04;
  color = "white";
}

function stop(){
  clearInterval(myInterval);
  x = 15;
  y = 15;
  dx = 0;
  dy = 0;
  //clear les éléments
  document.getElementById("victoire").innerHTML="";
  nombreCoups = 0;
  document.getElementById("nbCoups").innerHTML="";
}
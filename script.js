 
var xLength = window.innerWidth;
var yLength = window.innerHeight;
var mousePos={x:0,y:0};
 
var canvas = document.querySelectorAll('canvas')[0];
var ctx = canvas.getContext('2d');
 
var speed = 1.5;
var camx = 0.0, camy = 0.0, camz = 0.0;
var rotx, roty, rotz=0;
var sin = Math.sin, cos = Math.cos;
var x1,y1,z1,x2,y2,z2,x3,y3,z3,tempx,tempy,tempz;
 
var rate = 400;
var zPlane = 0.1;
 
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacebarPressed = false;
var shiftPressed = false;
var zoominPressed = false; //p
var zoomoutPressed = false; //o
var fasterPressed = false; //l
var slowerPressed = false; //k
var mPressed = false;
var nPressed = false;
 
function keyDownHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = true;
    }
    else if(event.keyCode == 65) {
        leftPressed = true;
    }
    if(event.keyCode == 83) {
    	downPressed = true;
    }
    else if(event.keyCode == 87) {
    	upPressed = true;
    }
    if(event.keyCode == 32) {
    	spacebarPressed = true;
    }
    else if(event.keyCode == 16) {
    	shiftPressed = true;
    }
    if(event.keyCode == 79){
    	zoominPressed = true;
    }
    if(event.keyCode == 80){
    	zoomoutPressed = true;
    }
    if(event.keyCode == 75){
    	fasterPressed = true;
    }
    if(event.keyCode == 76){
    	slowerPressed = true;
    }
    if(event.keyCode == 77){
    	mPressed = true;
    }
    if(event.keyCode == 78){
    	nPressed = true;
    }
}
 
function keyUpHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = false;
    }
    else if(event.keyCode == 65) {
        leftPressed = false;
    }
    if(event.keyCode == 83) {
    	downPressed = false;
    }
    else if(event.keyCode == 87) {
    	upPressed = false;
    }
    if(event.keyCode == 32) {
    	spacebarPressed = false;
    }
    else if(event.keyCode == 16) {
    	shiftPressed = false;
    }
    if(event.keyCode == 79){
    	zoominPressed = false;
    }
    if(event.keyCode == 80){
    	zoomoutPressed = false;
    }
    if(event.keyCode == 75){
    	fasterPressed = false;
    }
    if(event.keyCode == 76){
    	slowerPressed = false;
    }
    if(event.keyCode == 77){
    	mPressed = false;
    }
    if(event.keyCode == 78){
    	nPressed = false;
    }
}
 
function handler(){
    if(rightPressed){
    	camx += speed*cos(roty);
    	camz += speed*sin(roty);
    }
    if(leftPressed){
    	camx -= speed*cos(roty);
    	camz -= speed*sin(roty);
    }
    if(upPressed){
    	camx -= speed*sin(roty);
    	camz += speed*cos(roty);
    }
    if(downPressed){
    	camx += speed*sin(roty);
    	camz -= speed*cos(roty);
    }
    if(spacebarPressed){
    	camy += speed;
    }
    if(shiftPressed){
    	camy -= speed;
    }
    if(zoominPressed){
    	rate /= 0.9;
    }
    if(zoomoutPressed){
    	rate *= 0.9;
    }
    if(fasterPressed){
    	speed *= 0.9;
    }
    if(slowerPressed){
    	speed /= 0.9;
    }
    if(mPressed){
    	timeSpeed /= 0.9;
    }
    if(nPressed){
    	timeSpeed *= 0.9;
    }
}
 
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
 
onmousemove = function (e) {
	let k = document.querySelectorAll(".index")[0];
	k.style.left = e.pageX + "px";
	k.style.top = e.pageY + "px";
	document.querySelectorAll("#mouseX")[0].innerText = e.pageX;
	document.querySelectorAll("#mouseY")[0].innerText = e.pageY;
	mousePos.x = Number(document.querySelectorAll("#mouseX")[0].innerText) - (xLength/2);
	mousePos.y = (yLength/2) - Number(document.querySelectorAll("#mouseY")[0].innerText);
	rotx = mousePos.y/100;
	rotx = rotx>1.57 ? 1.57:rotx;
	rotx = rotx<-1.57 ? -1.57:rotx;
	roty = -mousePos.x/100;
	xLength = window.innerWidth;
	yLength = window.innerHeight;
}
 
function draw2d(x1,y1,x2,y2){
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}
 
function modifyPos(x,y,z){
	setValue(x - camx, y - camy, z - camz, 0);
	setValue(tempx*cos(roty)+tempz*sin(roty), tempy, tempz*cos(roty)-tempx*sin(roty), 0);
	setValue(tempx, tempy*cos(rotx)-tempz*sin(rotx), tempz*cos(rotx)+tempy*sin(rotx), 0);
	return [tempx, tempy, tempz];
}
 
function setValue(x,y,z,n){
	if(n==0){
		tempx=x; tempy=y; tempz=z;
	} else if(n==1){
		x1=x; y1=y; z1=z;
	} else if(n==2){
		x2=x; y2=y; z2=z;
	} else if(n==3){
		x3=x; y3=y; z3=z;
	}
}
 
function filltriangle(pos1,pos2,pos3){
	ctx.beginPath();
	ctx.moveTo(pos1[0]+xLength/2,yLength/2-pos1[1]);
	ctx.lineTo(pos2[0]+xLength/2,yLength/2-pos2[1]);
	ctx.lineTo(pos3[0]+xLength/2,yLength/2-pos3[1]);
	ctx.closePath();
	ctx.fill();
}

function drawCircle(x,y,radius,color){
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x+xLength/2,yLength/2-y,radius,0,6.28);
	ctx.fill();
}

function circle3d(x,y,z,radius,color,n){
	let pos = modifyPos(x,y,z);
	if(pos[2]>zPlane){
		drawCircle(pos[0]/pos[2]*rate,pos[1]/pos[2]*rate,radius/pos[2]*0.001,color);
		ctx.font = "30px Arial";
		ctx.fillText(n,pos[0]/pos[2]*rate+xLength/2,yLength/2-pos[1]/pos[2]*rate);
	}
}

function line3d(pos1,pos2){
	ctx.strokeStyle="black";
	if(pos1[2]>zPlane && pos2[2]>zPlane){
		ctx.beginPath();
		ctx.moveTo(pos1[0]/pos1[2]*rate+xLength/2,yLength/2-pos1[1]/pos1[2]*rate);
		ctx.lineTo(pos2[0]/pos2[2]*rate+xLength/2,yLength/2-pos2[1]/pos2[2]*rate);
		ctx.stroke();
	}else if(pos1[2]>zPlane){
		let pos = division(pos1,pos2);
		ctx.beginPath();
		ctx.moveTo(pos1[0]/pos1[2]*rate+xLength/2,yLength/2-pos1[1]/pos1[2]*rate);
		ctx.lineTo(pos[0]/pos[2]*rate+xLength/2,yLength/2-pos[1]/pos[2]*rate);
		ctx.stroke();
	}else if(pos2[2]>zPlane){
		let pos = division(pos1,pos2);
		ctx.beginPath();
		ctx.moveTo(pos[0]/pos[2]*rate+xLength/2,yLength/2-pos[1]/pos[2]*rate);
		ctx.lineTo(pos2[0]/pos2[2]*rate+xLength/2,yLength/2-pos2[1]/pos2[2]*rate);
		ctx.stroke();
	}
}

function projection(pos){
	return [pos[0]/pos[2]*rate, pos[1]/pos[2]*rate];
}
 
function division(pos1,pos2){
	return [(pos1[0]*(pos2[2]-zPlane)+(zPlane-pos1[2])*pos2[0])/(pos2[2]-pos1[2]),(pos1[1]*(pos2[2]-zPlane)+(zPlane-pos1[2])*pos2[1])/(pos2[2]-pos1[2]), zPlane];
}
 
function polygon(x1,y1,z1,x2,y2,z2,x3,y3,z3){
	var pos1=modifyPos(x1,y1,z1), pos2=modifyPos(x2,y2,z2), pos3=modifyPos(x3,y3,z3);
	if (pos2[2]>pos3[2]){
		var pos0 = pos2;
		pos2=pos3;
		pos3=pos0;
	}
	if (pos1[2]>pos2[2]){
		var pos0 = pos1;
		pos1=pos2;
		pos2=pos0;
	}
	if (pos2[2]>pos3[2]){
		var pos0 = pos2;
		pos2=pos3;
		pos3=pos0;
	}
	if (pos1[2]>zPlane){
		filltriangle(projection(pos1),projection(pos2),projection(pos3));
	} else if (pos2[2]>zPlane){
		var pos4=division(pos1,pos2);
		var pos5=division(pos1,pos3);
		filltriangle(projection(pos2),projection(pos3),projection(pos4));
		filltriangle(projection(pos3),projection(pos4),projection(pos5));
		console.log(pos4,pos5);
	} else if (pos3[2]>zPlane){
		var pos4=division(pos1,pos3);
		var pos5=division(pos2,pos3);
		filltriangle(projection(pos3),projection(pos4),projection(pos5));
	}
}
 
function cube(middleX,middleY,middleZ,length){
	poligon(middleX-length/2,middleY-length/2,middleZ-length/2);
}
 
function randompos(){
	return new Array(9).fill(1).map(function () {return Math.random()*100;});
}

JSON.new = function (a){return JSON.parse(JSON.stringify(a))};
Array.num = function (n){let sum=0; return Array(n).fill(1).map(()=>sum++)};
Array.sum = function (arr){let sum=0; arr.map(function(i){sum+=i}); return sum;};
Array.vecSum = function (arr){
	let [sum1,sum2]=[0,0];
	Array.num(arr.length).map(function(i){sum1+=arr[i][0]; sum2+=arr[i][1]});
	return [sum1,sum2];
}
Array.vecScalarProduct = function(arr,k){return JSON.new(arr).map(i=>i*k)};
var getInput = function(n){return Number(document.querySelectorAll("[name='"+n+"']")[0].value)}
cl = function(i, ...j){console.log(i, ...j);return i;};
rancl = function(i, ...j){if(Math.random()>0.98){cl(i, ...j)}};

const au = 149600000000;
var planetName = ["태양","수성","금성","지구","달","화성","목성","토성","천왕성","해왕성"];
var planet = [[0,0],[0,0.31*au],[-0.7233*au,0],[au,0],[au*1.00257,0],[0,-1.523679*au],[-5.204267*au,0],[0,9.537*au],[19.191*au,0],[0,-30.068*au]];
var mass = [1.989e30,3.285e23,4.687e24,5.972e24,7.36e22,6.39e23,1.898e27,5.683e26,8.681e25,1.024e26];
var velocity = [[0,0],[-47872.5,0],[0,-35021.4],[0,29800],[0,29100],[24077,0],[0,-13056.24],[-9639,0],[0,6795],[5430,0]];
var range = [696340,2439.7,6051.8,6371,1737.1,3389.5,69911,58232,25362,24622,1188.3];
var color = ["red","gray","rgb(200,0,0)","green","gray","brown","rgb(255,100,100)","brown","skyblue","blue"];
var gravityConst=6.67384e-11, timeSpeed=1e7, fps=60, rate1=1e10;
var trace = [];

function tracing(){
	trace = trace.slice(trace.length-20,trace.length);
	ctx.strokeStyle="white";
	let t = JSON.new(trace).map(arr=>arr.map(arr1=>modifyPos(arr1[0]/rate1,0,arr1[1]/rate1)));
	Array.num(trace[0].length).map(j=>{
		Array.num(trace.length-1).map(i=>line3d(t[i][j],t[i+1][j]));
	});
}

var accelerate1To = function (p1,p2,m){
	let rSquare = (p1[0]-p2[0])**2+(p1[1]-p2[1])**2;
	let kpr = gravityConst*m/rSquare**1.5;
	return [kpr*(p2[0]-p1[0]),kpr*(p2[1]-p1[1])];
}

var update = function (){
	timeSpeed = 10**getInput('timeSpeed');
	fps = getInput('fps');
	rate1 = 10**getInput('rate1');
}

var render = function (){
	ctx.clearRect(-500,-500,1000,1000);
	line3d(-100,0,0,100,0,0);
	line3d(0,-100,0,0,100,0);
	line3d(0,0,-100,0,0,100);
	trace.push(planet);
	//tracing();
	Array.num(mass.length).map(i=>circle3d(planet[i][0]/rate1,0,planet[i][1]/rate1,range[i],color[i],planetName[i]));
	Array.num(mass.length).map(function(i){
		velocity[i] = Array.vecSum([velocity[i],Array.vecScalarProduct(Array.vecSum(Array.num(mass.length-1).map(function(j){
			return accelerate1To(planet[i],planet[(i>j) ? j:j+1],mass[(i>j) ? j:j+1])
		})),timeSpeed/fps)])
	});
	Array.num(mass.length).map(function(i){planet[i]=Array.vecSum([planet[i],Array.vecScalarProduct(velocity[i],timeSpeed/fps)])});
	ctx.fillStyle="white";
	ctx.fillText("60프레임/초",1500,900);
	ctx.fillText(Math.floor(timeSpeed/1e7*1.92*10*24)/10 + "시간/프레임",1500,950);
	ctx.fillText("이동속도 : " + Math.floor((16.666*speed)*10)/10 + "km/프레임",1500,1000);
}
 
setInterval(function(){
	handler();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	render();
}, 1000/fps);

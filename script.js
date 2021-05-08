var cvs = document.querySelectorAll("#cvs")[0];
var ctx = cvs.getContext('2d');
ctx.translate(500,500);
ctx.filledCircle = function(x,y,r,c){
	ctx.beginPath();
	ctx.fillStyle = c;
	ctx.arc(x,y,r,0,6.28);
	ctx.fill();
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

const au = 149600000000
var planet = [[0,0],[au,0],[au*1.00257,0]], mass = [1.989e30,5.972e24,7.36e22], velocity = [[0,0],[0,29800],[0,29100]], range = [20,10,5], color = ["red","green","gray"];
var gravityConst=6.67384e-11, timeSpeed=1e7, fps=60, rate=1e9;
var trace = [];

var accelerateTo = function (p1,p2,m){
	let rSquare = (p1[0]-p2[0])**2+(p1[1]-p2[1])**2;
	let kpr = gravityConst*m/rSquare**1.5;
	return [kpr*(p2[0]-p1[0]),kpr*(p2[1]-p1[1])];
}

var update = function (){
	timeSpeed = 10**getInput('timeSpeed');
	fps = getInput('fps');
	rate = 10**getInput('rate');
}

var tracing = function (){
	ctx.beginPath();
	Array.num(trace[0].length).map(function(i){
		ctx.moveTo(trace[0][i][0]/rate,trace[0][i][1]/rate);
		Array.num(trace.length-1).map(function(j){
			ctx.lineTo(trace[j+1][i][0]/rate,trace[j+1][i][1]/rate);
		});
	});
	ctx.stroke();
}

let render = function (){
	ctx.clearRect(-500,-500,1000,1000);
	trace.push(planet);
	tracing();
	Array.num(mass.length).map(i=>ctx.filledCircle(planet[i][0]/rate,planet[i][1]/rate,range[i],color[i]));
	Array.num(mass.length).map(function(i){
		velocity[i] = Array.vecSum([velocity[i],Array.vecScalarProduct(Array.vecSum(Array.num(mass.length-1).map(function(j){
			return accelerateTo(planet[i],planet[(i>j) ? j:j+1],mass[(i>j) ? j:j+1])
		})),timeSpeed/fps)])
	});
	Array.num(mass.length).map(function(i){planet[i]=Array.vecSum([planet[i],Array.vecScalarProduct(velocity[i],timeSpeed/fps)])});
}

console.time("start");
setInterval(render,1000/fps);





// m, kg, s
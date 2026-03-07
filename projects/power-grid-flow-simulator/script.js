const canvas = document.getElementById("grid")
const ctx = canvas.getContext("2d")

const energyEl = document.getElementById("energy")

let plant1 = false
let plant2 = false

const plants = [
{x:100,y:200},
{x:100,y:100}
]

const cities = [
{x:500,y:100,powered:false},
{x:500,y:200,powered:false},
{x:500,y:300,powered:false}
]

function drawPlant(p,on){
ctx.fillStyle = on ? "green" : "gray"
ctx.beginPath()
ctx.arc(p.x,p.y,15,0,Math.PI*2)
ctx.fill()
}

function drawCity(c){
ctx.fillStyle = c.powered ? "orange" : "red"
ctx.beginPath()
ctx.arc(c.x,c.y,15,0,Math.PI*2)
ctx.fill()
}

function drawLine(a,b,active){

ctx.strokeStyle = active ? "#f59e0b" : "#ccc"
ctx.lineWidth = 4

ctx.beginPath()
ctx.moveTo(a.x,a.y)
ctx.lineTo(b.x,b.y)
ctx.stroke()

}

function update(){

let energy = 0

cities.forEach(c=>c.powered=false)

if(plant1){

energy += 50

drawLine(plants[0],cities[0],true)
drawLine(plants[0],cities[1],true)

cities[0].powered = true
cities[1].powered = true

}else{

drawLine(plants[0],cities[0],false)
drawLine(plants[0],cities[1],false)

}

if(plant2){

energy += 50

drawLine(plants[1],cities[2],true)
cities[2].powered = true

}else{

drawLine(plants[1],cities[2],false)

}

energyEl.textContent = energy

}

function draw(){

ctx.clearRect(0,0,600,400)

update()

plants.forEach((p,i)=>{
drawPlant(p,i===0?plant1:plant2)
})

cities.forEach(drawCity)

}

function loop(){

draw()
requestAnimationFrame(loop)

}

document.getElementById("plant1").onclick=()=>plant1=!plant1
document.getElementById("plant2").onclick=()=>plant2=!plant2

document.getElementById("restart").onclick=()=>{

plant1=false
plant2=false

}

loop()
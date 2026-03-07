const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const scoreEl = document.getElementById("score")
const scanBtn = document.getElementById("scan")
const restartBtn = document.getElementById("restart")

let enemies = []
let score = 0
let reveal = false
let scanCooldown = false

function spawnEnemy(){

enemies.push({
x:Math.random()*480,
y:Math.random()*380,
size:15
})

}

setInterval(spawnEnemy,1500)

function draw(){

ctx.clearRect(0,0,500,400)

if(reveal){

ctx.fillStyle="red"

enemies.forEach(e=>{
ctx.fillRect(e.x,e.y,e.size,e.size)
})

}

}

function gameLoop(){

draw()
requestAnimationFrame(gameLoop)

}

canvas.addEventListener("click",e=>{

const rect = canvas.getBoundingClientRect()

const mx = e.clientX - rect.left
const my = e.clientY - rect.top

enemies.forEach((enemy,i)=>{

if(
mx>enemy.x &&
mx<enemy.x+enemy.size &&
my>enemy.y &&
my<enemy.y+enemy.size
){

enemies.splice(i,1)

score++
scoreEl.textContent=score

}

})

})

scanBtn.onclick=()=>{

if(scanCooldown) return

reveal=true
scanCooldown=true

setTimeout(()=>{
reveal=false
},1000)

setTimeout(()=>{
scanCooldown=false
},3000)

}

restartBtn.onclick=()=>{

enemies=[]
score=0
scoreEl.textContent=0

}

gameLoop()
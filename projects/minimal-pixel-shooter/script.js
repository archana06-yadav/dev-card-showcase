const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const scoreEl = document.getElementById("score")
const restartBtn = document.getElementById("restart")

let keys = {}
let bullets = []
let enemies = []
let powerups = []

let score = 0
let gameOver = false

const player = {
x:240,
y:350,
size:15,
speed:4
}

document.addEventListener("keydown",e=>keys[e.key]=true)
document.addEventListener("keyup",e=>keys[e.key]=false)

function spawnEnemy(){

enemies.push({
x:Math.random()*480,
y:-20,
size:15,
speed:2
})

}

setInterval(spawnEnemy,1200)

function shoot(){

bullets.push({
x:player.x+6,
y:player.y,
size:4,
speed:6
})

}

document.addEventListener("keydown",e=>{
if(e.code==="Space") shoot()
})

function update(){

if(gameOver) return

if(keys["ArrowLeft"]||keys["a"]) player.x-=player.speed
if(keys["ArrowRight"]||keys["d"]) player.x+=player.speed
if(keys["ArrowUp"]||keys["w"]) player.y-=player.speed
if(keys["ArrowDown"]||keys["s"]) player.y+=player.speed

bullets.forEach(b=>{
b.y-=b.speed
})

enemies.forEach(e=>{
e.y+=e.speed
})

bullets.forEach((b,bi)=>{
enemies.forEach((e,ei)=>{

if(
b.x < e.x+e.size &&
b.x+b.size > e.x &&
b.y < e.y+e.size &&
b.y+b.size > e.y
){

bullets.splice(bi,1)
enemies.splice(ei,1)

score++
scoreEl.textContent=score

if(Math.random()<0.2){

powerups.push({
x:e.x,
y:e.y,
size:10
})

}

}

})
})

powerups.forEach(p=>{

p.y+=2

if(
p.x < player.x+player.size &&
p.x+p.size > player.x &&
p.y < player.y+player.size &&
p.y+p.size > player.y
){

score+=5
scoreEl.textContent=score

p.collected=true

}

})

powerups = powerups.filter(p=>!p.collected)

enemies.forEach(e=>{

if(
e.x < player.x+player.size &&
e.x+e.size > player.x &&
e.y < player.y+player.size &&
e.y+e.size > player.y
){

gameOver=true
setTimeout(()=>alert("Game Over"),100)

}

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

// player
ctx.fillStyle="#00f7ff"
ctx.fillRect(player.x,player.y,player.size,player.size)

// bullets
ctx.fillStyle="white"
bullets.forEach(b=>{
ctx.fillRect(b.x,b.y,b.size,b.size)
})

// enemies
ctx.fillStyle="#ff4d4d"
enemies.forEach(e=>{
ctx.fillRect(e.x,e.y,e.size,e.size)
})

// powerups
ctx.fillStyle="yellow"
powerups.forEach(p=>{
ctx.fillRect(p.x,p.y,p.size,p.size)
})

}

function gameLoop(){

update()
draw()

requestAnimationFrame(gameLoop)

}

restartBtn.onclick=()=>{

player.x=240
player.y=350

bullets=[]
enemies=[]
powerups=[]

score=0
scoreEl.textContent=0

gameOver=false

}

gameLoop()
import { drawTower, updateTower, removeBlock } from "./tower.js"

const canvas = document.getElementById("gameCanvas")
export const ctx = canvas.getContext("2d")

canvas.width = 600
canvas.height = 500

canvas.addEventListener("click",(e)=>{

const rect = canvas.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

removeBlock(x,y)

})

function gameLoop(){

ctx.clearRect(0,0,canvas.width,canvas.height)

updateTower()
drawTower()

requestAnimationFrame(gameLoop)

}

gameLoop()
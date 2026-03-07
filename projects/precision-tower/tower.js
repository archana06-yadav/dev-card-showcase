import { ctx } from "./game.js"
import { Block } from "./block.js"

export const tower=[]

// create tower
for(let y=0;y<8;y++){

for(let x=0;x<6;x++){

tower.push(
new Block(
200 + x*40,
420 - y*40
)
)

}

}

export function removeBlock(px,py){

for(let i=tower.length-1;i>=0;i--){

const b = tower[i]

if(
px > b.x &&
px < b.x + b.width &&
py > b.y &&
py < b.y + b.height
){

tower.splice(i,1)
break

}

}

}

export function updateTower(){

for(let block of tower){

block.update()

}

}

export function drawTower(){

for(let block of tower){

block.draw()

}

}
import { ctx } from "./game.js"
import { tower } from "./tower.js"

export class Block{

constructor(x,y){

this.x = x
this.y = y

this.width = 40
this.height = 40

this.vy = 0
this.rotation = 0

}

update(){

let supported = false

// check if block is supported by another block
for(let b of tower){

if(
b !== this &&
Math.abs(b.x - this.x) < 35 &&
Math.abs(b.y - (this.y + this.height)) < 5
){
supported = true
break
}

}

// gravity only if unsupported
if(!supported){

this.vy += 0.2
this.y += this.vy

}else{

this.vy = 0

}

if(this.y > 420){
this.y = 420
this.vy = 0
}

}

draw(){

ctx.save()

ctx.translate(
this.x + this.width/2,
this.y + this.height/2
)

ctx.rotate(this.rotation)

ctx.fillStyle="#ffaa00"

ctx.fillRect(
-this.width/2,
-this.height/2,
this.width,
this.height
)

ctx.restore()

}

}
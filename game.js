let menu = document.getElementById("menu")
let game = document.getElementById("game")
let gameOverScreen = document.getElementById("gameOver")

let playBtn = document.getElementById("playBtn")
let replayBtn = document.getElementById("replayBtn")
let menuBtn = document.getElementById("menuBtn")

let lanes = document.querySelectorAll(".lane")

let score = 0
let speed = 3

let tiles = []

let laneBusy = [false,false,false,false]

playBtn.onclick=startGame
replayBtn.onclick=startGame

menuBtn.onclick=()=>{

gameOverScreen.style.display="none"
menu.style.display="block"

}

function startGame(){

menu.style.display="none"
gameOverScreen.style.display="none"

game.style.display="block"

score=0
tiles=[]
laneBusy=[false,false,false,false]

requestAnimationFrame(update)

}

function spawnTile(){

let lane=Math.floor(Math.random()*4)

if(laneBusy[lane]) return

laneBusy[lane]=true

let tile=document.createElement("div")

tile.className="tile"

tile.style.top="-120px"

lanes[lane].appendChild(tile)

tiles.push({

el:tile,
lane:lane,
y:-120

})

}

function update(){

if(Math.random()<0.03) spawnTile()

tiles.forEach(tile=>{

tile.y+=speed

tile.el.style.top=tile.y+"px"

if(tile.y>window.innerHeight){

endGame()

}

})

requestAnimationFrame(update)

}

lanes.forEach((lane,i)=>{

lane.onclick=()=>hit(i)
lane.ontouchstart=()=>hit(i)

})

function hit(lane){

for(let tile of tiles){

if(tile.lane==lane){

if(tile.y>window.innerHeight-300){

pop(tile.el)

tile.el.remove()

laneBusy[lane]=false

tiles.splice(tiles.indexOf(tile),1)

score++

document.getElementById("score").innerText=score

return

}

}

}

endGame()

}

function pop(tile){

tile.style.transform="scale(1.3)"
tile.style.opacity="0"

}

function endGame(){

game.style.display="none"

gameOverScreen.style.display="block"

document.getElementById("finalScore").innerText="Score : "+score

  }

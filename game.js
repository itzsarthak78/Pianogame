const tg = window.Telegram.WebApp

let user = tg.initDataUnsafe?.user || {username:"Guest"}

let playBtn = document.getElementById("playBtn")
let leaderBtn = document.getElementById("leaderBtn")

let game = document.getElementById("game")
let menu = document.getElementById("menu")

let lanes = document.querySelectorAll(".lane")

let music = document.getElementById("music")

let score = 0
let combo = 0

let tiles = []

let speed = 4

playBtn.onclick = startGame

function startGame(){

menu.style.display="none"
game.style.display="block"

music.play()

requestAnimationFrame(update)

}

function spawnTile(lane){

let tile = document.createElement("div")

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

if(Math.random()<0.03){

spawnTile(Math.floor(Math.random()*4))

}

tiles.forEach(tile=>{

tile.y += speed

tile.el.style.top = tile.y+"px"

if(tile.y > window.innerHeight){

gameOver()

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

if(tile.lane===lane){

if(tile.y > window.innerHeight-300){

tile.el.remove()

tiles.splice(tiles.indexOf(tile),1)

score++

combo++

document.getElementById("score").innerText=score

document.getElementById("combo").innerText="Combo x"+combo

return

}

}

}

gameOver()

}

function gameOver(){

music.pause()

submitScore(score)

alert("Game Over\nScore: "+score)

location.reload()

}

async function submitScore(score){

await fetch("https://yourserver.com/score",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({

username:user.username,

score:score

})

})

}

leaderBtn.onclick=showLeaderboard

async function showLeaderboard(){

menu.style.display="none"

document.getElementById("leaderboard").style.display="block"

let res = await fetch("https://yourserver.com/top")

let data = await res.json()

let list = document.getElementById("leaderList")

list.innerHTML=""

data.forEach(p=>{

let li=document.createElement("li")

li.innerText=p.username+" - "+p.score

list.appendChild(li)

})

}

function closeLeaderboard(){

document.getElementById("leaderboard").style.display="none"

menu.style.display="block"

  }

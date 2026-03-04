const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.json())

let scores=[]

app.post("/score",(req,res)=>{

scores.push(req.body)

scores.sort((a,b)=>b.score-a.score)

scores = scores.slice(0,20)

res.send("ok")

})

app.get("/top",(req,res)=>{

res.json(scores)

})

app.listen(3000)

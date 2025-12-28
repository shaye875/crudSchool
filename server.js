import express from 'express'
import { students } from './studentsouter.js'


const app = express()

app.use(express.json())

app.use("/students",students)

app.listen(3000,()=>{
    console.log("server run")
})

app.get("/",(req,res)=>{
    res.send("")
})

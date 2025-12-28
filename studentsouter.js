import express from 'express'
import { connection } from './db.js'

export const students = express()

function isStudents(student) {
    const keys = ["id", "name", "age", "class_nam"]
    let count = 0
    for (let key in student) {
        for (let key_keys of keys) {
            if (key === key_keys) {
                count += 1
            }
        }
    }
    if (count === 4) {
        return true
    }
    return false
}

function isNumber(student) {
    if (typeof Number(student.age) === 'number') {
        return true
    }
    return false
}



students.post("/", async (req, res) => {
    const student = req.body
    const ifStudent = isStudents(student)
    if (ifStudent === false) {
        res.status(409)
        res.json({ "false": "missing data" })
    }
    const ifNumber = isNumber(student)
    if (ifNumber === false) {
        res.status(409)
        res.json({ "false": "age be a number" })
    }
    await connection.query(`insert into students(id,name,age,class_nam) values(${student.id},'${student.name}',${student.age},'${student.class_nam}')`)
    res.json(student)
})

students.get("/", async (req, res) => {
    const data = await connection.query("select * from students")
    res.send(data[0])
})

students.get("/:id", async (req, res) => {
    const { id } = req.params
    const data = await connection.query(`select * from students where id = ${id}`)
    res.json(data[0][0])
})

students.put("/:id", async (req, res) => {
    const { id } = req.params
    const body = req.body
    await connection.query(`update students set name = '${body.name}', age = ${body.age}, class_nam = '${body.class_nam}'`)
    const data = await connection.query(`select * from students where id = ${id}`)
    if (data[0][0]) {
        res.json(data[0][0])
    } else {
        res.status(404)
        res.json({ false: "id not found" })
    }

})

students.delete("/:id", async (req, res) => {
    const { id } = req.params
    const data = await connection.query(`select * from students where id = ${id}`)
    await connection.query(`delete from students where id = ${id}`)
    if (data[0][0]) {
        res.json({"massege": "student delete"})
    } else {
        res.status(404)
        res.json({ "error": "student not found" })
    }
})


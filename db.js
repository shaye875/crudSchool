import mysql from 'mysql2/promise'

export const connection = await mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "147258",
  database: "school_db",
  port: 3306,
})

await connection.query("SELECT 1")
console.log("mysql connected")

// await connection.query("create table students(id int,name varchar(100),age int,class_nam varchar(20))")


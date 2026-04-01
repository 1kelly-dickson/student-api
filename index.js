const express = require('express');
const mysql =  require('mysql2');
const db = require('./config/db.js');
const app = express();
const port = 3000;


// middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Waramutse Isi!");
});

// database configuration done in db.js



//in memory data 
// let students = [
//     {id: 1, name: "kelly"},
//     {id: 2, name: "dickson"}
// ];


//create students
app.post('/students', (req, res) => {
    const { fullnames, gender, age } = req.body;
    const newStudent = { fullnames, gender, age };

    db.query(
        'INSERT INTO students(fullnames, gender, age) VALUES (?, ?, ?)',
        [newStudent.fullnames, newStudent.gender, newStudent.age],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Student created successfully",
                studentId: result.insertId,
                student: newStudent
            });
        }
    );
});

// update student
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const existingStudent = students.find(s => s.id === id);
    if (!existingStudent) {
        return res.status(404).json({ error: "student not found" });
    }

    students = students.map(s => s.id === id ? { ...s, ...req.body } : s);
    res.status(200).json({ message: "student updated successfully" });
});


// delete student
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const existingStudent = students.find(s => s.id === id);
    if (!existingStudent) {
        return res.status(404).json({ error: "student not found" });
    }

    students = students.filter(s => s.id !== id);
    res.json({ message: "deleted student successfully" });
})

//fetching a specific student
app.get("/students/:id/school/:name", (req, res) => {
    const { id } = req.params;
    const student = students.find(s => s.id === parseInt(id));
    if (!student) {
        return res.status(404).json({error: "student not found"});
    }
            res.json(student);
});


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});

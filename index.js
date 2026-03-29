const express = require('express');
const app = express();
const port = 3000;

// middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Waramutse Isi!");
});

//in memory data 
let students = [
    {id: 1, name: "kelly"},
    {id: 2, name: "dickson"}
];


//create students
app.post('/students', (req, res) => {
    const {name, school} = req.body;
    const newStudent = {id: students.length + 1, name, school};
    students.push(newStudent);
    res.status(201).json(newStudent);
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

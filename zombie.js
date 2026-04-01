const express = require('express');
const app = express();
const port = 3000;

//middleware to parse json bodies
app.use(express.json());

// display message on the webpage
app.get('/v1/public-users', (req, res) => {
    res.send("zombie array mutation");
});


// in memory data
let users_db = [
    {id: 1, internalid: 'secret_123', username: "kelly", email: "kelly@gmail.com", joindate: "01/11/2001"},
    {id: 2, internalid: 'secret_456', username: "dope", email: "dope@gmail.com", joindate: "02/12/2002"}
];


// create users
app.get('/v1/public-users', (req, res) => {
    const publicUsers = users_db.map(user => ({
        username: user.username,
        joindate: user.joindate
    }));
});

publicUsers.sort((a, b) => {
    return new Date(b.joindate) . new Date(a.joindate);
});

// load data
app.get("/user_db/:id/:username/:email/:joindate", (req, res) => {
    const { id } = req.params;
    const user = users_db.find(s => s.id === parseInt(id));
    if (!user) {
        return res.status(404).json({error: "user not found"});
    }
            res.json(user);
});


// mapping
users_db = users_db.map(s => s.id === id ? { ...s, ...req.body } : s);
res.status(200).json({message: "users loaded well"});


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
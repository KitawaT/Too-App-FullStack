const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('tasks.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL
        )`
    );
})

// get /tasks
app.get('/tasks', (req, res) => {
    db.all(`SELECT * FROM tasks`, (err, rows)=> {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' }); // เพิ่ม return
        }
        res.json(rows);
    })
});

// post /tasks
app.post('/tasks', (req, res) => {
    const { text } = req.body;
    db.run(`INSERT INTO tasks (text) VALUES (?)`, [text], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' }); // เพิ่ม return
        }
        res.json({ id: this.lastID, text });
    });
});

// put /tasks/:id
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    db.run(`UPDATE tasks SET text = ? WHERE id = ?`, [text, id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' }); // เพิ่ม return
        }
        res.json({ id: Number(id), text });
    })
});

// delete /tasks/:id
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function(err){
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' }); // เพิ่ม return
        }
        res.json({ id: Number(id) });
    })
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
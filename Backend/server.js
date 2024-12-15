const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a new task
app.post('/tasks', (req, res) => {
    const { task_type, task_name, start_time, end_time, status } = req.body;
    const query = `INSERT INTO tasks (task_type, task_name, start_time, end_time, status) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [task_type, task_name, start_time, end_time, status], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId });
    });
});

// Get all tasks
app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { task_type, task_name, start_time, end_time, status } = req.body;
    const query = `UPDATE tasks SET task_type = ?, task_name = ?, start_time = ?, end_time = ?, status = ? WHERE id = ?`;
    db.query(query, [task_type, task_name, start_time, end_time, status, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM tasks WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// ค้นหาตามวันที่
app.get('/tasks/by-date', (req, res) => {
    const { date } = req.query;  // รับวันที่จาก query string
    const query = `SELECT * FROM tasks WHERE DATE(start_time) = ?`;
    db.query(query, [date], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// ค้นหาตามเดือน
app.get('/tasks/by-month', (req, res) => {
    const { month } = req.query;  // รับเดือนจาก query string
    const query = `SELECT * FROM tasks WHERE MONTH(start_time) = ?`;
    db.query(query, [month], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

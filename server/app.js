const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db',
});

db.connect((err) => {
    if (err) {
        console.log('Error connect to Mysql:', err);
    } else {
        console.log('connect to Mysql');
        createTable();
    }
});

const createTable = () => {
    const sql = 
    'CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))';
    db.query(sql, (err, result) => {
        if (err) {
            console.log('Error creat table:', err);
        } else {
            console.log('Table create successfully');
        }
    });
};

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(result);
        }
    });
});

app.post('/user', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO user (name, email) VALUES (?,?)';
    db.query(sql, [namem, email], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error adding user');
        } else {
            res.json({ id: result.insertId, name, email });
        }
    });
});

app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE users SET name=?, email=? WHERS id=?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) {
            console.error('Error execution query' , err);
            res.status(500).send('Error updating user');
        } else {
            res.json({ id: parseInt(id), name, email });
        }
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id=?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error deleting user');
      } else {
        res.json({ id: parseInt(id) });
      }
    });
  });   

app.listen(port, () => {
    console.log('Server is running');
});
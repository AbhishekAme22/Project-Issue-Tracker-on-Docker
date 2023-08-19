// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(express.static('frontend'));

// POST /api/issue (create an issue)
app.post('/api/issue', (req, res) => {
  const { projectName, title, description, priority } = req.body;
  const timestamp = new Date();

  const query = 'INSERT INTO issues (projectName, title, description, priority, added, lastUpdated) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [projectName, title, description, priority, timestamp, timestamp], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the issue.' });
    } else {
      res.status(201).json({ id: result.insertId, added: timestamp, lastUpdated: timestamp, ...req.body });
    }
  });
});

// GET /api/issue (get a list of issues)
app.get('/api/issue', (req, res) => {
  const query = 'SELECT * FROM issues';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the issues.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// GET /api/issue/{id} (get one issue from the list)
app.get('/api/issue/:id', (req, res) => {
  const issueId = req.params.id;
  const query = 'SELECT * FROM issues WHERE id = ?';
  db.query(query, [issueId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the issue.' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Issue not found.' });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
});

// PUT /api/issue/{id} (update a single issue)
app.put('/api/issue/:id', (req, res) => {
  const issueId = req.params.id;
  const { projectName, title, description, priority } = req.body;
  const timestamp = new Date();

  const query = 'UPDATE issues SET projectName = ?, title = ?, description = ?, priority = ?, lastUpdated = ? WHERE id = ?';
  db.query(query, [projectName, title, description, priority, timestamp, issueId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the issue.' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Issue not found.' });
      } else {
        res.status(200).json({ id: issueId, added: timestamp, lastUpdated: timestamp, ...req.body });
      }
    }
  });
});

// DELETE /api/issue/{id} (delete an issue)
app.delete('/api/issue/:id', (req, res) => {
  const issueId = req.params.id;
  const query = 'DELETE FROM issues WHERE id = ?';
  db.query(query, [issueId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the issue.' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Issue not found.' });
      } else {
        res.status(204).send();
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

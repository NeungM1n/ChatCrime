const express = require('express');
const app = express();
const path = require('path');
const story = require('./data/story.json');
const suspects = require('./data/suspects.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/story', (req, res) => {
  res.json(story);
});

app.get('/api/suspects', (req, res) => {
  res.json(suspects);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

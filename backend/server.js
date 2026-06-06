const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.post('/api/generate', (req, res) => {
  const { topic, slides } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  const outline = [];
  for (let i = 1; i <= (slides || 5); i += 1) {
    outline.push({
      title: `${topic} - Slide ${i}`,
      content: `This is the generated content for slide ${i} about ${topic}.`,
      slide_type: i === 1 ? 'title' : i === (slides || 5) ? 'conclusion' : 'content'
    });
  }

  return res.json({ topic, slides: slides || 5, outline });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

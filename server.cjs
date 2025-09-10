const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
const upload = multer();

app.post('/extract-pdf', upload.single('file'), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to extract PDF text.' });
  }
});

// Endpoint to list all JSON templates in /pdf
app.get('/list-templates', (req, res) => {
  const pdfDir = path.join(__dirname, 'pdf');
  fs.readdir(pdfDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read templates.' });
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    res.json({ templates: jsonFiles });
  });
});

// Endpoint to fetch a specific template's content
app.get('/get-template/:filename', (req, res) => {
  const { filename } = req.params;
  if (!filename.endsWith('.json')) return res.status(400).json({ error: 'Invalid file type.' });
  const filePath = path.join(__dirname, 'pdf', filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'Template not found.' });
    res.json({ content: JSON.parse(data) });
  });
});

// Endpoint to serve template metadata
app.get('/list-templates-meta', (req, res) => {
  const metaPath = path.join(__dirname, 'pdf', 'templates.json');
  fs.readFile(metaPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read template metadata.' });
    try {
      const meta = JSON.parse(data);
      res.json({ templates: meta });
    } catch (e) {
      res.status(500).json({ error: 'Invalid metadata format.' });
    }
  });
});

// Endpoint to list all JSON templates in /pdf (excluding templates.json and non-resume files)
app.get('/list-json-templates', (req, res) => {
  const pdfDir = path.join(__dirname, 'pdf');
  fs.readdir(pdfDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read pdf directory' });
    }
    // Only .json files, exclude templates.json and non-resume files
    const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'templates.json');
    res.json(jsonFiles);
  });
});

// Endpoint to fetch a specific JSON template by filename
app.get('/get-json-template/:filename', (req, res) => {
  const { filename } = req.params;
  // Security: only allow .json files, prevent path traversal
  if (!filename.endsWith('.json') || filename.includes('..') || filename === 'templates.json') {
    return res.status(400).json({ error: 'Invalid filename' });
  }
  const filePath = path.join(__dirname, 'pdf', filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (e) {
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

app.listen(5000, () => console.log('Server running on port 5000')); 
const express = require('express');
const app = express();
const form = require('./schemes/form');
const browse = require('./schemes/browse');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const port = 3000;

mongoose.connect('mongodb://localhost:27017/spotify');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '3(spotify clone)')));


app.get('/', (req, res) => {
  res.send("Hello world");
});

app.get('/spotify', (req, res) => {
  const filePath = path.join(__dirname, 'playlist', 'spotify.html');
  res.sendFile(filePath);
});

app.get('/spotify/playlist', (req, res) => {
  const filePath = path.join(__dirname, 'playlist', 'playlist.html');
  res.sendFile(filePath);
});

app.get('/spotify/playlist/form', (req, res) => {
  const filePath = path.join(__dirname, 'playlist', 'form.html');
  res.sendFile(filePath);
});

app.get('/spotify/browse', (req, res) => {
  const filePath = path.join(__dirname, 'playlist', 'browse.html');
  res.sendFile(filePath);
});

// POST REQUEST


// POST request of the form playlist

app.post('/spotify/playlist/form/fill', async (req, res) => {
    try {
      const { username, songName, view } = req.body;
  
      // Convert the view value to a Boolean
      const isPublic = view === 'Public';
  
      const newForm = new form({
        username,
        song: songName,
        view: isPublic
      });
  
      await newForm.save();
  
      res.status(201).json({ message: 'Song saved successfully!' });
    } catch (error) {
      console.error('Error saving song:', error);
      res.status(500).json({ message: 'Failed to save song' });
    }
  });


// POST request of the form browser

app.post('/spotify/browse/fill', async (req, res) => {
    try {
      const { songname,artist } = req.body;
  

  
      const newbrowse = new browse({
        songname,
        artist
      });
  
      await newbrowse.save();
  
      res.status(201).json({ message: 'Song saved successfully!' });
    } catch (error) {
      console.error('Error saving song:', error);
      res.status(500).json({ message: 'Failed to save song' });
    }
  });





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
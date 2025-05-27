const express = require('express');
const path = require('path'); // Import the path module
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Import the Group model
const groups = require('./scehmas/click'); // Ensure the path is correct

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/facebook')
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((error) => {
    console.log('Connection failed:', error.message);
  });



// Serve static files from the "main" and "sponser_click" folders
app.use(express.static(path.join(__dirname, 'main')));
app.use(express.static(path.join(__dirname, 'sponser_click')));

// Route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello World! This is Wasif work');
});

// Route for "/facebook"
app.get('/facebook', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'spotify.html'));
});

// Route for "/facebook/sponsers"
app.get('/facebook/sponsers', (req, res) => {
  res.sendFile(path.join(__dirname, 'sponser_click', 'sponser.html'));
});

// Route for "/facebook/groups"
app.get('/facebook/groups', (req, res) => {
  res.sendFile(path.join(__dirname, 'sponser_click', 'click.html'));
});

// Route to create a new group
app.post('/facebook/groups/create', async (req, res) => {
  try {
    const { friends } = req.body; // Updated to match frontend data

    if (!friends || !Array.isArray(friends)) {
      return res.status(400).json({ message: 'Invalid friends data' });
    }

    // Create a new group document
    const newGroup = new groups({
      save_data_group: friends.join(', '), // Convert array to a string
    });

    // Save the document to the database
    await newGroup.save();

    res.status(201).json({ message: 'Group created successfully!' });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Failed to create group', error: error.message });
  }
});

// Import the Sponsor model
const Sponsor = require('./scehmas/sponser');



// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files in the "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
});

// Route to handle sponsorship form submission
app.post('/facebook/sponser/create', upload.single('image'), async (req, res) => {
  try {
    const { name, description, link } = req.body;
    const image = req.file; // Uploaded file details

    // Validate required fields
    if (!name || !description || !image) {
      return res.status(400).json({ message: 'Name, description, and image are required' });
    }

    // Create a new sponsor document
    const newSponsor = new Sponsor({
      name,
      description,
      link,
      image: image.path, // Save the file path
    });

    // Save the document to the database
    await newSponsor.save();

    res.status(201).json({ message: 'Sponsorship saved successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to save sponsorship', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
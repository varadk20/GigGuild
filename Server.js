const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Import the fs module
const path = require('path'); // Import the path module
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URI
const mongoUri = process.env.MONGO_URI;

// Function to create a directory if it doesn't exist
const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Use recursive to create parent directories if needed
    console.log(`Directory created: ${dirPath}`);
  } else {
    console.log(`Directory already exists: ${dirPath}`);
  }
};

// Create the 'data' directory
const dataDir = path.join(__dirname, 'data');
createDirectoryIfNotExists(dataDir);

// Connect to MongoDB Atlas
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    await saveTagReposToJson(); // Call the function to save data to JSON
    await saveRecruiterToJson(); // Call the function to save recruiter data to JSON
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Define a User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Define a new schema for storing tags and repositories
const tagRepoSchema = new mongoose.Schema({
  email: { type: String, required: true }, // User email to associate with the freelancer
  tags: { type: [String], required: true }, // Array of tags
  repositories: [
    {
      name: { type: String, required: true },
      description: { type: String, required: false }, // Make description optional
      url: { type: String, required: true }
    }
  ]
});

const TagRepo = mongoose.model('TagRepo', tagRepoSchema);

// Function to save the TagRepo collection to a JSON file
const saveTagReposToJson = async () => {
  try {
    const tagRepos = await TagRepo.find({});
    fs.writeFileSync(path.join(dataDir, 'tagrepos.json'), JSON.stringify(tagRepos, null, 2), 'utf8'); // Updated path
    console.log('TagRepos data saved to data/tagrepos.json');
  } catch (error) {
    console.error('Error saving TagRepos data to JSON:', error);
  }
};

// Function to save the Recruiter collection to a JSON file
const saveRecruiterToJson = async () => {
  try {
    const recruiters = await Recruiter.find({});
    fs.writeFileSync(path.join(dataDir, 'recruiters.json'), JSON.stringify(recruiters, null, 2), 'utf8'); // Updated path
    console.log('Recruiters data saved to data/recruiters.json');
  } catch (error) {
    console.error('Error saving Recruiters data to JSON:', error);
  }
};

// Signup route
app.post('/api/signup', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const newUser = new User({ email, password, role });
    await newUser.save();
    console.log('User created:', newUser);

    res.status(201).json({ message: 'User created', role: newUser.role });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      res.status(200).json({ message: 'Login successful', role: user.role, email: user.email });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

// Route to save tags and repositories to MongoDB
app.post('/api/save-tags-repos', async (req, res) => {
  const { email, tags, repositories } = req.body;
  try {
    // Check if a record already exists for the user
    let tagRepo = await TagRepo.findOne({ email });
    if (tagRepo) {
      // If the record exists, update it
      tagRepo.tags = tags;
      tagRepo.repositories = repositories;
    } else {
      // If no record exists, create a new one
      tagRepo = new TagRepo({ email, tags, repositories });
    }

    // Save the record to the database
    await tagRepo.save();
    await saveTagReposToJson(); // Save to JSON file after saving to DB
    res.status(200).json({ message: 'Tags and repositories saved successfully' });
  } catch (error) {
    console.error('Error saving tags and repositories:', error);
    res.status(500).send('Error saving tags and repositories');
  }
});

// Route to get tags and repositories based on the user's email
app.get('/api/get-tags-repos', async (req, res) => {
  const { email } = req.query; // Get email from the query parameter
  try {
    // Find the tagRepo record that matches the user's email
    const tagRepo = await TagRepo.findOne({ email });

    if (tagRepo) {
      res.status(200).json({
        tags: tagRepo.tags,
        repositories: tagRepo.repositories,
      });
    } else {
      res.status(404).send('No tags and repositories found for this user');
    }
  } catch (error) {
    console.error('Error fetching tags and repositories:', error);
    res.status(500).send('Error fetching tags and repositories');
  }
});

// Serve the JSON file
app.get('/api/tagrepos', (req, res) => {
  fs.readFile(path.join(dataDir, 'tagrepos.json'), 'utf8', (err, data) => { // Updated path
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send('Error reading JSON file');
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

// Define a new schema for the Recruiter collection
const recruiterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  description: { type: String, required: true },
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

// Route to save the email and description in the recruiter collection
app.post('/api/save-recruiter', async (req, res) => {
  const { email, description } = req.body;
  try {
    // Check if a record already exists for the user
    let recruiter = await Recruiter.findOne({ email });
    if (recruiter) {
      // If the record exists, update the description
      recruiter.description = description; // Update description
    } else {
      // If no record exists, create a new one
      recruiter = new Recruiter({ email, description });
    }

    // Save the record to the database
    await recruiter.save();
    console.log('Recruiter data saved:', recruiter);
    
    await saveRecruiterToJson(); // Save recruiter data to JSON after saving to DB

    res.status(200).json({ message: 'Recruiter data saved successfully' });
  } catch (error) {
    console.error('Error saving recruiter data:', error);
    res.status(500).send('Error saving recruiter data');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());

// Replace with your own connection string from MongoDB Atlas
const mongoUri = process.env.MONGO_URI;
// Connect to MongoDB Atlas
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/api/signup', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const newUser = new User({ email, password, role });
    await newUser.save();
    console.log('User created:', newUser); // Log the created user

    // Return the user role upon successful signup
    res.status(201).json({ message: 'User created', role: newUser.role });
  } catch (error) {
    console.error('Error creating user:', error); // Log the error
    res.status(500).send('Error creating user');
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) { // Direct comparison
      res.status(200).json({ message: 'Login successful', role: user.role }); // Return role
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in:', error); // Log the error
    res.status(500).send('Error logging in');
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

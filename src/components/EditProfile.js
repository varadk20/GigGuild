import React, { useState } from 'react';
import { TextField, Button, Avatar, Grid, Typography, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './EditProfile.css'; // Import the CSS for EditProfile

function EditProfile() {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('/static/images/avatar/1.jpg');
  const [primarySkill, setPrimarySkill] = useState('');
  const [secondarySkill, setSecondarySkill] = useState('');

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      const file = URL.createObjectURL(event.target.files[0]);
      setProfileImage(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log('Username:', username);
    console.log('Profile Image:', profileImage);
    console.log('Primary Skill:', primarySkill);
    console.log('Secondary Skill:', secondarySkill);
  };

  return (
    <Paper className="container">
      <Typography variant="h4" gutterBottom>Edit Profile</Typography>
      <form className="form" onSubmit={handleSubmit}>
        <Avatar src={profileImage} className="avatar" />
        <input
          accept="image/*"
          id="file-input"
          type="file"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <label htmlFor="file-input">
          <Button variant="contained" component="span">
            Change Profile Image
          </Button>
        </label>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <FormControl variant="outlined" className="formControl">
          <InputLabel htmlFor="primary-skill">Primary Skill</InputLabel>
          <Select
            value={primarySkill}
            onChange={(e) => setPrimarySkill(e.target.value)}
            label="Primary Skill"
            id="primary-skill"
          >
            {['JavaScript', 'Python', 'Java', 'C++', 'Ruby'].map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="formControl">
          <InputLabel htmlFor="secondary-skill">Secondary Skill</InputLabel>
          <Select
            value={secondarySkill}
            onChange={(e) => setSecondarySkill(e.target.value)}
            label="Secondary Skill"
            id="secondary-skill"
          >
            {['React', 'Node.js', 'Django', 'Angular', 'Spring'].map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="button"
        >
          Save Changes
        </Button>
      </form>
    </Paper>
  );
}

export default EditProfile;

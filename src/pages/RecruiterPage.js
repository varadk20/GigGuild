// src/pages/RecruiterPage.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon
import ProfileMenu from '../components/ProfileMenu';
import Sidebar from '../components/Sidebar'; // Import Sidebar

function RecruiterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');  // State for the input field

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);  // Update the input value on change
  };

  const handleSubmit = () => {
    // Add logic to handle button click, such as submitting the input data
    console.log('User input:', inputValue);
    // You can add further actions like sending the input to an API or updating the state
    setInputValue('');  // Optionally clear the input after submission
  };

  return (
    <div className="homepage">
      <AppBar position="static" className="navbar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleSidebarOpen}
            style={{ marginRight: '20px' }}
          >
            <MenuIcon /> {/* Three small lines */}
          </IconButton>
          <Typography variant="h6" className="title">
            Recruiter Page
          </Typography>
          <div className="search">
            <InputBase
              placeholder="Search…"
              className="inputBase"
            />
            <IconButton type="submit" className="searchIcon">
              <SearchIcon />
            </IconButton>
          </div>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
      <div style={{ padding: '20px' }}>
        <Typography variant="h4">Welcome to the Recruiter Dashboard!</Typography>

        {/* Input field and button for user input */}
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Enter your input"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            style={{ marginRight: '10px', flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ height: '50px' }}  /* Make button height match input field */
          >
            Submit
          </Button>
        </div>

        {/* Add additional content here */}
      </div>
    </div>
  );
}

export default RecruiterPage;

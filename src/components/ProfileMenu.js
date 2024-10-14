import React, { useState } from 'react';
import { Menu, MenuItem, Avatar, IconButton, Tabs, Tab, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ProfileMenu.css'; // Import the CSS for ProfileMenu

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      navigate('/edit-profile'); // Navigate to EditProfile page
    } else if (newValue === 1) {
      navigate('/projects'); // Navigate to Projects page
    } else if (newValue === 2) {
      navigate('/wallet'); // Navigate to Wallet page
    } else if (newValue === 3) {
      // Logic for Logout
      // Optionally, clear any authentication tokens or session data here
      // For example: localStorage.removeItem('authToken');
      navigate('/loginsignup'); // Navigate to the Login page after logging out
    }
    handleMenuClose(); // Close the menu after a tab is clicked
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleProfileMenuClick}
        color="inherit"
        className="profileIcon"
      >
        <Avatar alt="Profile Icon" src="/static/images/avatar/1.jpg" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="profile-menu"
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        className="profileMenu"
      >
        <Box sx={{ width: 200 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="profile tabs"
            orientation="vertical"
            variant="scrollable"
            className="profileTabs"
          >
            <Tab label="Edit Profile" />
            <Tab label="Projects" />
            <Tab label="Wallet" />
            <Tab label="Logout" />
          </Tabs>
        </Box>
      </Menu>
    </div>
  );
}

export default ProfileMenu;

import React, { useState } from 'react';
import { Menu, MenuItem, Avatar, IconButton, Tabs, Tab, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
    }
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
          </Tabs>
        </Box>
      </Menu>
    </div>
  );
}

export default ProfileMenu;

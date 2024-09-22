// src/pages/RecruiterPage.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon
import ProfileMenu from '../components/ProfileMenu';
import Sidebar from '../components/Sidebar'; // Import Sidebar

function RecruiterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
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
        {/* Add additional content here */}
      </div>
    </div>
  );
}

export default RecruiterPage;

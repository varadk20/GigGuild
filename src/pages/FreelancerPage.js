import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button, Card, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileMenu from '../components/ProfileMenu';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import './FreelancerPage.css'; // Import the CSS file

function FreelancerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [repos, setRepos] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState(null);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const fetchGitHubRepos = async (token) => {
    try {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setRepos(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error fetching repositories');
      setRepos([]); // Clear previous repos on error
    }
  };

  const handleTokenSubmit = () => {
    fetchGitHubRepos(accessToken);
  };

  return (
    <div className="freelancerpage">
      <AppBar position="static" className="navbar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleSidebarOpen}
            style={{ marginRight: '20px' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            Home Page
          </Typography>
          <div className="search">
            <InputBase placeholder="Search…" className="inputBase" />
            <IconButton type="submit" className="searchIcon">
              <SearchIcon />
            </IconButton>
          </div>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} /> 
      <div className="content-container">
        <Typography variant="h4">Welcome to TheGigGuild!</Typography>
        
        {/* GitHub Personal Access Token Input */}
        <div className="token-input-container">
          <InputBase
            placeholder="Enter GitHub Personal Access Token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="token-input" // Apply the token input class
          />
          <Button 
            variant="contained" 
            className="fetch-button" // Apply the button class
            onClick={handleTokenSubmit}
          >
            Fetch Projects
          </Button>
        </div>
        {error && <Typography color="error">{error}</Typography>}
        
        {/* Display fetched repositories */}
        <div className="projects-container">
          {repos.map((repo) => (
            <Card key={repo.id} className="project-card">
              <CardContent>
                <Typography variant="h5" component="div">
                  {repo.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {repo.description || 'No description available'}
                </Typography>
                <Button size="small" href={repo.html_url} target="_blank">
                  View on GitHub
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}

export default FreelancerPage;

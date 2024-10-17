import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button, Card, CardContent, Chip, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileMenu from '../components/ProfileMenu';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import './FreelancerPage.css'; // Import the CSS file

function FreelancerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [repos, setRepos] = useState([]); // Fetched from GitHub
  const [savedRepos, setSavedRepos] = useState([]); // Repos saved in the database
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      setRepos(response.data); // Fetched repos
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error fetching repositories');
      setRepos([]); // Clear previous repos on error
    }
  };

  const handleTokenSubmit = () => {
    fetchGitHubRepos(accessToken);
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const saveTagsAndRepos = async () => {
    const email = localStorage.getItem('userEmail'); // Retrieve the email from localStorage
    
    // Map repositories to include name, description, and URL
    const repositoriesData = repos.map((repo) => ({
      name: repo.name, 
      description: repo.description || 'No description available',
      url: repo.html_url,
    }));

    try {
      const response = await axios.post('http://localhost:5000/api/save-tags-repos', {
        email: email,
        tags: tags,
        repositories: repositoriesData,
      });

      setSuccessMessage('Data saved successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error saving tags and repositories');
      setSuccessMessage('');
    }
  };

  const fetchSavedTagsAndRepos = async () => {
    const email = localStorage.getItem('userEmail'); // Retrieve the email from localStorage
    if (email) {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-tags-repos?email=${email}`);
        if (response.data) {
          setTags(response.data.tags || []);
          setSavedRepos(response.data.repositories || []); // Save data to separate state
        }
      } catch (error) {
        setErrorMessage('Error fetching saved tags and repositories');
      }
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('userEmail'); // Check if email exists in localStorage
    if (!email) {
      // Redirect to login page if email not found
      window.location.href = '/login';
    } else {
      fetchSavedTagsAndRepos(); // Fetch the saved tags and repos if email exists
    }
  }, []);

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

        {/* Tags Input */}
        <div className="tags-input-container">
          <InputBase
            placeholder="Add technologies (e.g., HTML,CSS)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            className="tag-input"
          />
          <div className="tags-display">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleTagDelete(tag)}
                color="primary"
                className="tag-chip"
              />
            ))}
          </div>
        </div>

        {/* GitHub Personal Access Token Input */}
        <div className="token-input-container">
          <InputBase
            placeholder="Enter GitHub Access Token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="token-input"
          />
          <div className="button-group">
            <Button onClick={handleTokenSubmit} variant="contained" color="primary">
              Fetch Repos
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={saveTagsAndRepos}
            >
              Save Tags & Repos
            </Button>
          </div>
        </div>

        {/* Repositories Display (Fetched Repos) */}
        <div className="repos-display">
          {repos.length > 0 && (
            <div>
              <Typography variant="h6">Fetched Repositories</Typography>
              {repos.map((repo) => (
                <Card key={repo.id} className="repo-card">
                  <CardContent>
                    <Typography variant="h6">{repo.name}</Typography>
                    <Typography variant="body2">{repo.description || 'No description available'}</Typography>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                      {repo.html_url}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Saved Repositories Display (from database) */}
        <div className="saved-repos-display">
          {savedRepos.length > 0 && (
            <div>
              <Typography variant="h6">Saved Repositories</Typography>
              {savedRepos.map((repo, index) => (
                <Card key={index} className="repo-card">
                  <CardContent>
                    <Typography variant="h6">{repo.name}</Typography>
                    <Typography variant="body2">{repo.description || 'No description available'}</Typography>
                    <a 
                      href={repo.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                      {repo.url}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Success and Error Messages */}
        {successMessage && (
          <Snackbar
            open={!!successMessage}
            autoHideDuration={6000}
            onClose={() => setSuccessMessage('')}
          >
            <Alert severity="success">{successMessage}</Alert>
          </Snackbar>
        )}

        {errorMessage && (
          <Snackbar
            open={!!errorMessage}
            autoHideDuration={6000}
            onClose={() => setErrorMessage('')}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Snackbar>
        )}
      </div>
    </div>
  );
}

export default FreelancerPage;

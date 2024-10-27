import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button, Card, CardContent, Chip, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileMenu from '../components/ProfileMenu';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import recruiterData from '../data/recruiters.json'; // Import the JSON file
import './FreelancerPage.css';

function FreelancerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [repos, setRepos] = useState([]);
  const [savedRepos, setSavedRepos] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recruiters, setRecruiters] = useState([]); // State for recruiter data

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
      setError(null);
    } catch (error) {
      setError('Error fetching repositories');
      setRepos([]);
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
    const email = localStorage.getItem('userEmail');
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
    const email = localStorage.getItem('userEmail');
    if (email) {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-tags-repos?email=${email}`);
        if (response.data) {
          setTags(response.data.tags || []);
          setSavedRepos(response.data.repositories || []);
        }
      } catch (error) {
        setErrorMessage('Error fetching saved tags and repositories');
      }
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      window.location.href = '/login';
    } else {
      fetchSavedTagsAndRepos();
      setRecruiters(recruiterData); // Load recruiter data from JSON
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
                    <Typography variant="body2">{repo.description}</Typography>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.url}</a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>


        {/* Recruiters Display */}
        <div className="recruiters-display" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {recruiters.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Typography variant="h6" style={{ width: '100%' }}>Available Positions</Typography>
              {recruiters.map((recruiter, index) => (
                <Card key={index} className="repo-card" style={{ flex: '1 1 300px', maxWidth: '300px' }}>
                  <CardContent>
                    <Typography variant="h6">{recruiter.email}</Typography>
                    <Typography variant="body2">{recruiter.company}</Typography>
                    <Typography variant="body2">{recruiter.description}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => window.open(`mailto:${recruiter.email}`, '_blank')}
                    >
                      Apply
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>



        {/* Snackbar for success and error messages */}
        <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
          <Alert onClose={() => setSuccessMessage('')} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>

        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
          <Alert onClose={() => setErrorMessage('')} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default FreelancerPage;

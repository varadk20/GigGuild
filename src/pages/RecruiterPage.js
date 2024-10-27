import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, TextField, Button, Card, CardContent, CardActions, Collapse } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import MailOutline from '@mui/icons-material/MailOutline'; 
import ProfileMenu from '../components/ProfileMenu';
import Sidebar from '../components/Sidebar';

function RecruiterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputValueDes, setInputValueDes] = useState('');
  const [tagRepos, setTagRepos] = useState([]);
  const [filteredTagRepos, setFilteredTagRepos] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputChangeDes = (e) => {
    setInputValueDes(e.target.value);
  };

  const handleSubmit = async () => {
    const filteredData = tagRepos.filter(repo => 
      repo.tags.some(tag => tag.toLowerCase().includes(inputValue.toLowerCase())) ||
      repo.repositories.some(repository => repository.name.toLowerCase().includes(inputValue.toLowerCase()))
    );

    setFilteredTagRepos(filteredData);
    setInputValue('');
  };

  const handleDescriptionSubmit = async () => {
    const email = localStorage.getItem('userEmail'); // Get email from local storage

    try {
      const response = await fetch('http://localhost:5000/api/save-recruiter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, description: inputValueDes }),
      });

      if (response.ok) {
        setSuccessMessage('Description saved successfully!'); // Set success message
        localStorage.setItem('recruiterDescription', inputValueDes); // Save description to local storage
      } else {
        setSuccessMessage('Error saving description.'); // Set error message
        console.error('Error saving description:', response.statusText);
      }
    } catch (error) {
      setSuccessMessage('Error saving description.'); // Set error message
      console.error('Error saving description:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tagrepos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTagRepos(data);
      setFilteredTagRepos(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    // Retrieve the description from local storage when the component mounts
    const storedDescription = localStorage.getItem('recruiterDescription');
    if (storedDescription) {
      setInputValueDes(storedDescription);
    }
  }, []);

  const toggleDetails = (index) => {
    setDetailsOpen((prevDetailsOpen) => ({
      ...prevDetailsOpen,
      [index]: !prevDetailsOpen[index],
    }));
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            Recruiter Page
          </Typography>
          <div className="search">
            <InputBase
              placeholder="Search…"
              className="inputBase"
              value={inputValue}
              onChange={handleInputChange}
            />
            <IconButton type="submit" className="searchIcon" onClick={handleSubmit}>
              <SearchIcon />
            </IconButton>
          </div>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
      <div style={{ padding: '20px' }}>
        <Typography variant="h4">Welcome to the Recruiter Dashboard!</Typography>

        {/* Success message display */}
        {successMessage && <Typography variant="body1" color="success.main">{successMessage}</Typography>}

        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Enter description"
            variant="outlined"
            value={inputValueDes}
            onChange={handleInputChangeDes}
            style={{ marginRight: '10px', flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDescriptionSubmit}
            style={{ height: '50px' }}
          >
            Save description
          </Button>
        </div>

        {/* Existing input for searching tags and repositories */}
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Enter your search input"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            style={{ marginRight: '10px', flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ height: '50px' }}
          >
            Submit
          </Button>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          <Typography variant="h5" style={{ width: '100%', marginBottom: '20px' }}>Fetched Tags and Repositories:</Typography>
          {(filteredTagRepos.length > 0 ? filteredTagRepos : tagRepos).map((repo, index) => (
            <Card key={index} variant="outlined" style={{ flex: '1 0 30%', maxWidth: 400 }}>
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  <strong>Email:</strong> {repo.email}
                  <IconButton
                    href={`mailto:${repo.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    size="small"
                    style={{ marginLeft: '8px' }}
                  >
                    <MailOutline />
                  </IconButton>
                </Typography>
                <Typography variant="body1"><strong>Tags:</strong> {repo.tags.join(', ')}</Typography>
                <Typography variant="body2" style={{ marginBottom: '10px' }}><strong>Repositories:</strong></Typography>
                <ul>
                  {repo.repositories.slice(0, 1).map((repository, repoIndex) => (
                    <li key={repoIndex}>
                      <strong>Name:</strong> {repository.name}
                    </li>
                  ))}
                </ul>
                <Collapse in={detailsOpen[index]}>
                  <ul>
                    {repo.repositories.map((repository, repoIndex) => (
                      <li key={repoIndex}>
                        <strong>Name:</strong> {repository.name} <br />
                        <strong>Description:</strong> {repository.description} <br />
                        <strong>URL:</strong> <a href={repository.url} target="_blank" rel="noopener noreferrer">{repository.url}</a>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => toggleDetails(index)}>
                  {detailsOpen[index] ? 'Hide Details' : 'View Details'}
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecruiterPage;

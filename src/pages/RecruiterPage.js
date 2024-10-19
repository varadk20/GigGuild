import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, TextField, Button, Card, CardContent, CardActions, Collapse } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon
import ProfileMenu from '../components/ProfileMenu';
import Sidebar from '../components/Sidebar'; // Import Sidebar

function RecruiterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(''); // State for the input field
  const [tagRepos, setTagRepos] = useState([]); // State to store fetched data from the JSON file
  const [filteredTagRepos, setFilteredTagRepos] = useState([]); // State to store filtered results
  const [detailsOpen, setDetailsOpen] = useState({}); // State for managing details visibility of each card

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value on change
  };

  const handleSubmit = () => {
    console.log('User input:', inputValue);
    
    // Filter tagRepos based on inputValue
    const filteredData = tagRepos.filter(repo => 
      repo.tags.some(tag => tag.toLowerCase().includes(inputValue.toLowerCase())) ||
      repo.repositories.some(repository => repository.name.toLowerCase().includes(inputValue.toLowerCase()))
    );

    setFilteredTagRepos(filteredData); // Update filtered data
    setInputValue(''); // Clear the input after submission
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tagrepos'); // Change URL as needed
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTagRepos(data); // Set the fetched data to state
      setFilteredTagRepos(data); // Initialize filtered data with all data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  const toggleDetails = (index) => {
    setDetailsOpen((prevDetailsOpen) => ({
      ...prevDetailsOpen,
      [index]: !prevDetailsOpen[index], // Toggle visibility for the specific card
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
            <MenuIcon /> {/* Three small lines */}
          </IconButton>
          <Typography variant="h6" className="title">
            Recruiter Page
          </Typography>
          <div className="search">
            <InputBase
              placeholder="Search…"
              className="inputBase"
              value={inputValue}
              onChange={handleInputChange} // Handle input change
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

        {/* Display fetched or filtered data in cards */}
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          <Typography variant="h5" style={{ width: '100%', marginBottom: '20px' }}>Fetched Tags and Repositories:</Typography>
          {(filteredTagRepos.length > 0 ? filteredTagRepos : tagRepos).map((repo, index) => (
            <Card key={index} variant="outlined" style={{ flex: '1 0 30%', maxWidth: 400 }}>
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}><strong>Email:</strong> {repo.email}</Typography>
                <Typography variant="body1"><strong>Tags:</strong> {repo.tags.join(', ')}</Typography>
                <Typography variant="body2" style={{ marginBottom: '10px' }}><strong>Repositories:</strong></Typography>
                <ul>
                  {repo.repositories.slice(0, 1).map((repository, repoIndex) => ( // Show only one by default
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

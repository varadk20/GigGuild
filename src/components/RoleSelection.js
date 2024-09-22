// src/components/RoleSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

function RoleSelection() {
  const navigate = useNavigate(); // Updated from useHistory

  const handleRoleSelection = (role) => {
    if (role === 'freelancer') {
      navigate('/freelancer-home');
    } else if (role === 'recruiter') {
      navigate('/recruiter-home');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Please select your role:</Typography>
      <Button onClick={() => handleRoleSelection('freelancer')}>Freelancer</Button>
      <Button onClick={() => handleRoleSelection('recruiter')}>Recruiter</Button>
    </Box>
  );
}

export default RoleSelection;

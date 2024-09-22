import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Divider, Box, Typography, Chip, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import './ChatRoom.css';  // Import custom CSS

function ChatRoom() {
  const [messages, setMessages] = useState([
    { 
      text: 'Hello, everyone!', 
      user: 'John Doe', 
      skill: 'JavaScript', 
      time: new Date(), 
      joined: 'March 2022', 
      role: 'Frontend Developer' 
    },
    { 
      text: 'Hi John!', 
      user: 'Jane Smith', 
      skill: 'React', 
      time: new Date(), 
      joined: 'July 2023', 
      role: 'Full Stack Developer' 
    }
  ]);

  const [messageInput, setMessageInput] = useState('');
  const currentUser = 'Current User'; // Replace with actual current user data

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        text: messageInput,
        user: currentUser,
        skill: 'Your Skill', // Replace with actual current user skill
        time: new Date(),
        joined: 'January 2024', // Replace with actual data
        role: 'Backend Developer', // Replace with actual role
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh', width: '100%' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              className={msg.user === currentUser ? 'message-right' : 'message-left'}
              alignItems="flex-start"
            >
              <ListItemText
                primary={
                  <Box>
                    <Tooltip
                      title={
                        <Box>
                          <Typography variant="body2" color="inherit">Joined: {msg.joined}</Typography>
                          <Typography variant="body2" color="inherit">Role: {msg.role}</Typography>
                        </Box>
                      }
                      arrow
                      placement="top"
                    >
                      <Typography variant="body1" component="div">
                        {msg.user} 
                        <Chip label={msg.skill} color="primary" sx={{ marginLeft: 1 }} />
                      </Typography>
                    </Tooltip>
                    <Typography variant="body2" color="textSecondary">
                      {msg.text}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ marginTop: 1 }}>
                      {dayjs(msg.time).format('h:mm A')}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', padding: '10px' }}>
        <TextField
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          variant="outlined"
          placeholder="Type your message"
          fullWidth
        />
        <Button onClick={handleSendMessage} variant="contained" color="primary" sx={{ marginLeft: '10px' }}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ChatRoom;

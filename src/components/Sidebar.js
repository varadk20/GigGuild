import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatRoom from './ChatRoom'; // Import ChatRoom component

function Sidebar({ open, onClose }) {
  const [openChat, setOpenChat] = useState(false);
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [chatGroups, setChatGroups] = useState([]);
  const [bookmarkGroups, setBookmarkGroups] = useState([]);
  const [newBookmarkGroupName, setNewBookmarkGroupName] = useState('');
  const [openBookmarkDialog, setOpenBookmarkDialog] = useState(false);

  // Handling Global Chat
  const handleOpenChat = () => {
    setOpenChat(true);
  };
  const handleCloseChat = () => {
    setOpenChat(false);
  };

  // Handling Group Creation
  const handleCreateGroup = () => {
    setOpenGroupDialog(true);
  };
  const handleSaveGroup = () => {
    if (groupName.trim()) {
      setChatGroups([...chatGroups, groupName]);
      setGroupName('');
      setOpenGroupDialog(false);
    }
  };

  // Handling Group Deletion
  const handleDeleteGroup = (groupIndex) => {
    const updatedGroups = chatGroups.filter((_, index) => index !== groupIndex);
    setChatGroups(updatedGroups);
  };

  // Handling Bookmark Group Creation
  const handleCreateBookmarkGroup = () => {
    setOpenBookmarkDialog(true);
  };
  const handleSaveBookmarkGroup = () => {
    if (newBookmarkGroupName.trim()) {
      setBookmarkGroups([...bookmarkGroups, newBookmarkGroupName]);
      setNewBookmarkGroupName('');
      setOpenBookmarkDialog(false);
    }
  };

  // Handling Bookmark Group Deletion
  const handleDeleteBookmarkGroup = (bookmarkGroupIndex) => {
    const updatedBookmarkGroups = bookmarkGroups.filter((_, index) => index !== bookmarkGroupIndex);
    setBookmarkGroups(updatedBookmarkGroups);
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 240,
          },
        }}
      >
        {/* Chat Section */}
        <List>
          <ListItem button onClick={handleOpenChat}>
            <ListItemText primary="Global Chat" />
            <ChatIcon />
          </ListItem>
          <ListItem button onClick={handleCreateGroup}>
            <ListItemText primary="Create Group" />
          </ListItem>
          {chatGroups.map((group, index) => (
            <ListItem key={index}>
              <ListItemText primary={group} />
              <IconButton onClick={() => handleDeleteGroup(index)} size="small" edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Gigs Section */}
        <List>
          <ListItem>
            <ListItemText primary="Gigs" />
            <BookmarkIcon />
          </ListItem>
          <ListItem button onClick={handleCreateBookmarkGroup}>
            <ListItemText primary="Create Bookmark Group" />
          </ListItem>
          {bookmarkGroups.map((bookmarkGroup, index) => (
            <ListItem key={index}>
              <ListItemText primary={bookmarkGroup} />
              <IconButton onClick={() => handleDeleteBookmarkGroup(index)} size="small" edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Global Chat Dialog */}
      <Dialog open={openChat} onClose={handleCloseChat} fullWidth maxWidth="sm">
        <DialogTitle>Global Chat</DialogTitle>
        <DialogContent>
          <ChatRoom />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChat} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Chat Group Dialog */}
      <Dialog open={openGroupDialog} onClose={() => setOpenGroupDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create Chat Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGroupDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveGroup} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Bookmark Group Dialog */}
      <Dialog open={openBookmarkDialog} onClose={() => setOpenBookmarkDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create Bookmark Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            fullWidth
            value={newBookmarkGroupName}
            onChange={(e) => setNewBookmarkGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBookmarkDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveBookmarkGroup} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Sidebar;

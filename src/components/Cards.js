import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './Cards.css'; // Import the CSS file

const cardsData = [
  {
    id: 1,
    title: 'Card 1',
    description: 'Saves related tags and GitHub collaboration for recruiter profile',
    media: '/Card1.jpeg', // Replace with actual image path
    mediaType: 'image',
  },
  {
    id: 2,
    title: 'Card 2',
    description: 'filtered search to find relevant freelancers',
    media: '/Card2.jpeg', // Replace with actual image path
    mediaType: 'image',
  },
  {
    id: 3,
    title: 'Card 3',
    description: 'Freelancer can apply and mail the recruiter',
    media: '/Card3.jpeg',
    mediaType: 'image',
  },
];

function Cards() {
  return (
    <div className="cards-container">
      {cardsData.map(card => (
        <Card key={card.id} className="card">
          <CardMedia
            component="img"
            alt={card.title}
            image={card.media}
            className="card-media"
          />
          <div className="card-overlay">
            <Typography variant="h5" component="div" className="overlay-title">
              {card.title}
            </Typography>
            <Typography variant="body2" className="overlay-description">
              {card.description}
            </Typography>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Cards;

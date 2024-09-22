import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const cardsData = [
  {
    id: 1,
    title: 'Card 1',
    description: 'Description for card 1',
    media: '/assets/videos/Coding.mp4', // Replace with actual image or video path
    mediaType:'video',
  },
  {
    id: 2,
    title: 'Card 2',
    description: 'Description for card 2',
    media: '/assets/images/lion.png',
    mediaType:'image',
  },
  {
    id: 3,
    title: 'Card 3',
    description: 'Description for card 3',
    media: '/path/to/image3.jpg',
  },
  {
    id: 4,
    title: 'Yo Its me',
    description: 'Hi Chapron what are you doing lorem ipsum sdblwefblwiviwe ildhq;fbqkchqf ilhdbqfklavqk wdlq doagdackhavciaevfkaca kjcvbakeca. cab.cac kjada uawgda.ckuae.kcuaceckaughchāē skxga.cuag.dauc akuga.caus/.alg',
    media: '/path/to/image4.jpg',
  },
  {
    id: 5,
    title: 'Card 5',
    description: 'Description for card 5',
    media: '/path/to/image5.jpg',
  },
  {
    id: 6,
    title: 'Card 6',
    description: 'Description for card 6',
    media: '/path/to/image6.jpg',
  }
];

function Cards() {
  return (
    <div className="cards-container">
      {cardsData.map(card => (
        <Card key={card.id} className="card">
          {card.mediaType === 'image' ? (
            <CardMedia
              component="img"
              alt={card.title}
              height="140"
              image={card.media}
              className="card-media"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline  // Ensures video plays without controls
              alt={card.title}
              height="140"
              className="card-media"
              src={card.media}
            />
          )}
          <CardContent>
            <Typography variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
  
  export default Cards;

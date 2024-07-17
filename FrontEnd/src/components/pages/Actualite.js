import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Service = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/annonces')
      .then(response => response.json())
      .then(data => setAnnouncements(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  const CardComponent = ({ title, description, imageUrl }) => (
    <Card sx={{ maxWidth: 350, margin: '0 auto' }}>
      <CardActionArea>
        <CardMedia component="img" height="200" image={imageUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", marginBottom: 5 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <div style={{ background: "beige", height: 550, paddingTop: 20 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 30 }}>Annonces</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1500}
        >
          {announcements.map((announcement, index) => (
            <div key={index} style={{ flex: '1' }}>
              <CardComponent
                title={announcement.title}
                description={announcement.description} // Pass description to CardComponent
                imageUrl={announcement.imageUrl}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Service;

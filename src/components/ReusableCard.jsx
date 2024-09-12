import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ReusableCard = ({ id, imageUrl, title, description, route }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${route}/details/${id}`, { state: { id, title, description, imageUrl } });
  };

  return (
    <Card className="hover-card" onClick={handleCardClick}>
      <Card.Img variant="top" src={imageUrl} alt={title} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <div className="card-content">
            <Card.Text className="card-description">
                {description}
            </Card.Text>
        </div>
        <Button variant="primary" onClick={handleCardClick}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ReusableCard;

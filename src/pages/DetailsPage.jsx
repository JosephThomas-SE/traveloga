import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams();  // Get the dynamic ID from the URL
  const location = useLocation();  // Access passed state

  // Destructure the state passed from the previous page
  const { title, description, imageUrl } = location.state || {};

  return (
    <div className="details-page">
      <img src={imageUrl} alt={title} className="details-image" />
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default DetailsPage;

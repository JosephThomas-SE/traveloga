import React, { useState } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import ReusableCard from '../../components/ReusableCard';
import { useNavigate } from 'react-router-dom';

const ResortsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const resorts = [
    { id: 1, title: 'Vagamon Hills Resort', description: 'Luxury and nature combined.', imageUrl: '/assets/resort1.jpg', route: 'resorts' },
    { id: 2, title: 'Mountain View Resort', description: 'A scenic getaway.', imageUrl: '/assets/resort2.jpg', route: 'resorts' },
    // Add more resorts
  ];

  const handleSearch = () => {
    // Assuming search functionality will search the resorts by title or ID
    const resort = resorts.find((resort) => resort.title.toLowerCase().includes(searchTerm.toLowerCase()) || resort.id === parseInt(searchTerm));
    if (resort) {
      navigate(`/resorts/details/${resort.id}`, { state: resort });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Form inline className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search Resorts"
              className="mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </Form>
        </Col>
      </Row>

      <Row className="resort-list">
        <Col md={12}>
          <h2>Featured Resorts</h2>
        </Col>
        {resorts.map(resort => (
          <Col md={4} key={resort.id}>
            <ReusableCard 
              id={resort.id}
              imageUrl={resort.imageUrl}
              title={resort.title}
              description={resort.description}
              route={resort.route}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ResortsPage;

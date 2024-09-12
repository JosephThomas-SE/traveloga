import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ReusableCard from '../../components/ReusableCard';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const HostPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      fetchProperties(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProperties(properties.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredProperties(properties);
    }
  }, [searchTerm, properties]);

  const fetchProperties = async (userId) => {
    try {
      // Fetch resorts
      const resortRef = ref(storage, `resorts/${userId}`);
      const resortList = await listAll(resortRef);
      const resorts = await Promise.all(resortList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { id: item.name, title: item.name, description: 'Resort description', imageUrl: url, route: 'resorts' };
      }));

      // Fetch restaurants
      const restaurantRef = ref(storage, `restaurants/${userId}`);
      const restaurantList = await listAll(restaurantRef);
      const restaurants = await Promise.all(restaurantList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { id: item.name, title: item.name, description: 'Restaurant description', imageUrl: url, route: 'restaurants' };
      }));

      setProperties([...resorts, ...restaurants]);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleSearch = () => {
    // Trigger search manually if needed
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Form inline className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search Properties"
              className="mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </Form>
        </Col>
      </Row>

      <Row className="property-list">
        <Col md={12}>
          <h2>Your Properties</h2>
        </Col>
        {filteredProperties.map(property => (
          <Col md={4} key={property.id}>
            <ReusableCard 
              id={property.id}
              imageUrl={property.imageUrl}
              title={property.title}
              description={property.description}
              route={property.route}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HostPage;

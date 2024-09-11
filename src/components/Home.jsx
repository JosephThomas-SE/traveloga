import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Components.css';

const Home = () => {
  return (
    <div className="home-container">
      <Container fluid>
        <Row>
          <Col md={12} className="welcome-message">
            <h1>Welcome to TRAVELOGA</h1>
            <h4>Your one-stop destination for finding the best resorts, restaurants, and adventure activities.</h4>
            <p>Explore the beautiful Vagamon, from resorts to site seeing to jeep safaries.</p>
          </Col>
        </Row>

        <Row className="resort-list">
          <h2>Featured Resorts</h2>
          {/* Example resort cards, you can fetch and map over actual data */}
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="/assets/resort1.jpg" alt="Resort 1" />
              <Card.Body>
                <Card.Title>Vagamon Hills Resort</Card.Title>
                <Card.Text>
                  Experience luxury and nature combined at the Vagamon Hills Resort.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="/assets/resort2.jpg" alt="Resort 2" />
              <Card.Body>
                <Card.Title>Mountain View Resort</Card.Title>
                <Card.Text>
                  Enjoy stunning mountain views and serene surroundings at the Mountain View Resort.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="/assets/resort3.jpg" alt="Resort 3" />
              <Card.Body>
                <Card.Title>Lake Paradise Resort</Card.Title>
                <Card.Text>
                  Relax by the lake and soak in the natural beauty at Lake Paradise Resort.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

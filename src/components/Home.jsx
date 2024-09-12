import React, { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import logo from '../assets/images/flyer.png';
import './Components.css';
import { SidebarContext } from '../services/SidebarContext'; // Assuming you have this context

const Home = () => {
  const { isSidebarOpen } = useContext(SidebarContext); // Sidebar state

  return (
    <div className={`home-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Container fluid>
        <Row>
          <Col>
            <div className="sidebar-header">
              <img src={logo} alt="Traveloga Logo" className="sidebar-logo" />
              <h3 className="sidebar-title">TRAVELOGA</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="welcome-message">
            <h1>Welcome to TRAVELOGA</h1>
            <h4>Your one-stop destination for finding the best resorts, restaurants, and adventure activities.</h4>
            <p>Explore the beautiful Vagamon, from resorts to site seeing to jeep safaries.</p>
          </Col>
        </Row>

        <Row className="resort-list">
        <Col md={4}>
          <Card className="hover-card">
            <Card.Img variant="top" src="/assets/images/hotel1.jpg" alt="Resort 1" />
            <Card.Body>
              <div className="card-content">
                <Card.Title className="card-title">Vagamon Hills Resort</Card.Title>
                <Card.Text>
                  Experience luxury and nature combined at the Vagamon Hills Resort.
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

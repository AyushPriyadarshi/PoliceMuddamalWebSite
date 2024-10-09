// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Tab, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Chart from 'chart.js'; // Chart.js for pie chart
import policeLogo from '../mumbai_logo.png';
import '../cssModules/Dashboard.css'; // Add your styles here

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false); // For handling modal
  const navigate = useNavigate(); // For navigation
  
  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // Example chart data
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie', // or 'bar' for bar chart
      data: {
        labels: ['Category A', 'Category B', 'Category C'],
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      }
    });
  }, []);

  // Function to show the logout confirmation modal
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  // Function to confirm the logout
  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/'); // Navigate back to login screen
  };

  // Function to cancel the logout
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <Container fluid>
      {/* Header */}
      <Row className="header-row align-items-center">
        <Col md={2} className="logo-container">
          <img src={policeLogo} alt="Maharastra Police Logo" className="police-logo" />
        </Col>
        <Col md={8} className="text-center title-container">
          <h1 className="website-title">Mumbai Police - Muddamaal Management</h1>
          <p className="current-time">{currentTime.toLocaleString()}</p>
        </Col>
        <Col md={1}>
          <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
        </Col>
      </Row>

      {/* Tab Navigation */}
      <Row className="nav-row my-3">
        <Col>
          <Tab.Container defaultActiveKey="Dashboard">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link as={Link} to="/Dashboard" eventKey="Dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/MudemaalList" eventKey="MudemaalList">Mudemaal List</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/MudemaalRegistration" eventKey="MudemaalRegistration">New Mudemaal Registration</Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Tab Content */}
            <Tab.Content>
              <Tab.Pane eventKey="Dashboard">
                {/* Dashboard Content */}
                <Row className="chart-section">
                  <Col md={6}>
                    <h2>Consolidated Data</h2>
                    <canvas id="myChart"></canvas>
                  </Col>
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="MudemaalList">
                {/* Mudemaal List Content */}
                <h2>Mudemaal List Page</h2>
              </Tab.Pane>

              <Tab.Pane eventKey="MudemaalRegistration">
                {/* Mudemaal Registration Content */}
                <h2>New Mudemaal Registration Page</h2>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={cancelLogout}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={confirmLogout}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <Row>
        <Col className="text-center">
          <p>Developed by Your Company</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

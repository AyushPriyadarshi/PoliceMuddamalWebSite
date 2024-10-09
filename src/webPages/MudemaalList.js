import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Dropdown, Modal, Nav } from 'react-bootstrap';
import axios from 'axios'; // Use axios directly for API calls
import '../cssModules/MudemaalList.css'; // Import the CSS file
import policeLogo from '../mumbai_logo.png'; // Import your police logo image
import { Link, useNavigate } from 'react-router-dom';

const MudemaalList = () => {
  const [muddamaalList, setMuddamaalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false); // For handling modal
  const navigate = useNavigate(); // For navigation

  // Fetch muddamaal data from the MySQL API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://your-api-url.com/api/muddamaal'); // Replace with your actual API URL
        setMuddamaalList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching muddamaal data:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Set interval to update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval); // Clear interval on component unmount
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
      {/* Header Section */}
      <Row className="header-row align-items-center">
        <Col md={2} className="logo-container">
          <img src={policeLogo} alt="Maharastra Police Logo" className="police-logo" />
        </Col>
        <Col md={8} className="text-center title-container">
          <h1 className="website-title">Mumbai Police - Muddamaal Management</h1>
          <p className="current-time">{currentTime.toLocaleString()}</p>
        </Col>
        <Col md={1} className="action-buttons">
          <Button variant="danger" className="logout-btn" onClick={handleLogout}>Log Out</Button>
        </Col>
      </Row>

      {/* Navigation Tabs */}
      <Nav variant="tabs" defaultActiveKey="/MudemaalList" className="my-3">
        <Nav.Item>
          <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/MudemaalList" eventKey="list">Mudemaal List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/MudemaalRegistration" eventKey="register">New Mudemaal Registration</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Action Buttons */}
      <Row className="action-buttons-row my-3">
        <Col md={9}>
          <h2>List of Muddamaal</h2>
        </Col>
      </Row>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Filters Row */}
      <Row className="filters-row my-3">
        <Col md={6}>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Sort by latest
            </Dropdown.Toggle>
          </Dropdown>
        </Col>
        <Col md={6} className="text-right">
          <input type="text" placeholder="Search..." className="search-input" />
        </Col>
      </Row>

      {/* Muddamaal Table */}
      <Row>
        <Col>
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <Table striped bordered hover responsive className="muddamaal-table">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Crime No</th>
                  <th>Crime Date</th>
                  <th>Muddamaal No</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Custody Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {muddamaalList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.crimeNo}</td>
                    <td>{item.crimeDate}</td>
                    <td>{item.muddamaalNo}</td>
                    <td className={item.category === 'Other' ? 'red-label' : 'green-label'}>
                      {item.category}
                    </td>
                    <td>{item.quantity}</td>
                    <td>₹{item.value}</td>
                    <td>{item.status}</td>
                    <td>{item.custodyDate}</td>
                    <td>
                      <Button variant="info" className="action-btn">
                        View
                      </Button>
                      <Button variant="warning" className="action-btn">
                        Edit
                      </Button>
                      <Button variant="danger" className="action-btn">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      {/* Footer */}
      <Row>
        <Col className="text-center">
          <p>Developed by Your Company</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MudemaalList;

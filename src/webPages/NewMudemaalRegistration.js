import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Button, Form,Modal,Nav } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import policeLogo from '../mumbai_logo.png';
import '../cssModules/NewMudemaalRegistration.css';

const NewMudemaalRegistration = () => {
  const [formData, setFormData] = useState({
    crimeNo: '',
    crimeDate: '',
    mudemaalType: '',
    mudemaalDetails: '',
    issueDate: '',
    officerName: '',
    officerDate: '',
    orderNo: ''
  });
  
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false); // For handling modal
  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);

    // Here you can send the formData to your backend to create a new entry in the database.
    // Example: 
    // axios.post('/api/mudemaal', formData)
    //   .then(response => {
    //     // handle success
    //     console.log(response);
    //     navigate('/mudemaal-list'); // redirect to Mudemaal list page
    //   })
    //   .catch(error => {
    //     // handle error
    //     console.log(error);
    //   });
  };

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
          <Button variant="danger" onClick={handleLogout}>Log Out</Button>
        </Col>
      </Row>

      {/* Navigation */}
      {/* Tab Navigation */}
      <Nav variant="tabs" defaultActiveKey="/MudemaalRegistration" className="my-3">
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

      {/* Form Section */}
      <Row>
        <Col md={12}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="crimeNo">
                  <Form.Label>Crime No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter crime number"
                    name="crimeNo"
                    value={formData.crimeNo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="crimeDate">
                  <Form.Label>Crime Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="crimeDate"
                    value={formData.crimeDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="mudemaalType">
                  <Form.Label>Mudemaal Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter mudemaal type"
                    name="mudemaalType"
                    value={formData.mudemaalType}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="mudemaalDetails">
                  <Form.Label>Mudemaal Details</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter mudemaal details"
                    name="mudemaalDetails"
                    value={formData.mudemaalDetails}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="officerName">
                  <Form.Label>Officer in Charge</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter officer's name"
                    name="officerName"
                    value={formData.officerName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="officerDate">
                  <Form.Label>Officer Arrival Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="officerDate"
                    value={formData.officerDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="orderNo">
                  <Form.Label>Order No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter order number"
                    name="orderNo"
                    value={formData.orderNo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="issueDate">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
            <Button variant="danger" className="mt-3 ml-3" onClick={() => navigate('/mudemaal-list')}>
              Cancel
            </Button>
          </Form>
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

export default NewMudemaalRegistration;

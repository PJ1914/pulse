import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/config";
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Profile.css";

const UserProfile = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error.message}</p>;
  }

  return (
    <Container className="emp-profile">
      <Tab.Container defaultActiveKey="about">
        <Row>
          <Col md={4}>
            <div className="profile-img">
              <Avatar
                alt={user?.displayName}
                src={user?.photoURL}
                sx={{ width: "50%", height: "auto" }}
              />             
            </div>
          </Col>
          <Col md={6}>
            <div className="profile-head">
              <h5>{user?.displayName || "User Name"}</h5>
              <Nav variant="tabs" className="profile-tabs">
                <Nav.Item>
                  <Nav.Link eventKey="about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="timeline">Timeline</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          <Col md={2}>
            <Button variant="primary" className="profile-edit-btn">Edit Profile</Button>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Tab.Content>
              <Tab.Pane eventKey="about">
                <div className="row">
                  <div className="col-md-6">
                    <label>User Id</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user?.uid || "UserID"}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user?.displayName || "User Name"}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user?.email || "Email not available"}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>123 456 7890</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Profession</label>
                  </div>
                  <div className="col-md-6">
                    <p>Web Developer and Designer</p>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="timeline">
                <div className="row">
                  <div className="col-md-6">
                    <label>Time Spent on Web App</label>
                  </div>
                  <div className="col-md-6">
                    <p>15 hours</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Days Using App</label>
                  </div>
                  <div className="col-md-6">
                    <p>30 days</p>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default UserProfile;

// src/components/ProfilePage.js
import React, { useContext } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { Context } from '../main';
import ProfileServices from '../components/ProfileServices';
import UserBookings from '../components/UserBookings';
import Navigation from '../components/Navigation';
import { observer } from'mobx-react-lite';
const Profile = observer(() => {
  const { user, service, booking } = useContext(Context);
  return (
    <>
      <Navigation />
      <Container>
        <h1>Профиль</h1>
        <Tab.Container defaultActiveKey="services">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="services">Услуги</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="myBookings">Мои записи</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="services">
                  <ProfileServices />
                </Tab.Pane>
                <Tab.Pane eventKey="myBookings">
                  <UserBookings />
                </Tab.Pane>
                
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
})

export default Profile;

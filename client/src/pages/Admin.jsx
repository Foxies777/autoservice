import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import AddServiceForm from '../components/AddServiceForm';
import ServiceBookingsList from '../components/ServiceBookingsList';
import Navigation from '../components/Navigation';
import { fetchServiceBookings } from '../api/bookingService';  // Предполагаем, что есть функция fetchServices
import { fetchServices } from '../api/serviceService';
const Admin = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');

  useEffect(() => {
    // Загрузка списка услуг
    fetchServices().then(data => {
      setServices(data);
      if (data && data.length > 0) {
        setSelectedServiceId(data[0].id);  // Установка первой услуги как выбранной по умолчанию
      }
    });
  }, []);

  useEffect(() => {
    // Загрузка бронирований для выбранной услуги
    if (selectedServiceId) {
      fetchServiceBookings(selectedServiceId).then(data => {
        console.log('Bookings:', data);
      });
    }
  }, [selectedServiceId]);  // Этот useEffect срабатывает каждый раз при изменении selectedServiceId

  const handleServiceChange = (event) => {
    setSelectedServiceId(event.target.value);
  };

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col>
            <h2>Добавление новой услуги</h2>
            <AddServiceForm />
          </Col>
          <Col>
            <h2>Записи на услугу</h2>
            <Form.Group controlId="serviceSelect">
              <Form.Label>Выберите услугу</Form.Label>
              <Form.Control as="select" value={selectedServiceId} onChange={handleServiceChange}>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <ServiceBookingsList serviceId={selectedServiceId} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Admin;

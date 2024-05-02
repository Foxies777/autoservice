// src/components/ServiceBookingsList.jsx
import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { fetchServiceBookings } from '../api/bookingService';

const ServiceBookingsList = ({ serviceId }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchServiceBookings(serviceId).then(setBookings);
    }, [serviceId]);
    console.log(bookings);
    return (
        <ListGroup>
            {bookings.map(booking => (
                <ListGroup.Item key={booking.id}>
                    Пользователь ID: {booking.userId} - Запись на дату: {new Date(booking.date).toLocaleDateString()}
                    <Button variant="danger" onClick={() => deleteBooking(booking.id)}>Удалить</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ServiceBookingsList;

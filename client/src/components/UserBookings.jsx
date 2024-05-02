import React, { useState, useEffect, useContext } from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import { Context } from '../main';
import { fetchUserBookings } from '../api/bookingService';

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        if (user.user && user.user.id) {
            fetchUserBookings(user.user.id).then(data => {
                setBookings(data);
            });
        }
    }, [user.user.id]);

    // Функция для отображения статуса заявки в виде бейджа
    const renderStatusBadge = (status) => {
        let variant;
        switch (status) {
            case 'active':
                variant = 'success';
                break;
            case 'pending':
                variant = 'warning';
                break;
            case 'cancelled':
                variant = 'danger';
                break;
            default:
                variant = 'secondary';
                break;
        }
        return <Badge bg={variant}>{status}</Badge>;
    };

    return (
        <ListGroup>
            {bookings.length > 0 ? bookings.map(booking => (
                <ListGroup.Item key={booking.id} className="d-flex justify-content-between align-items-center">
                    <div>
                        Услуга: <strong>{booking.service.name}</strong> - Запись на дату: {new Date(booking.service.date).toLocaleDateString()}
                    </div>
                    <div>
                        {renderStatusBadge(booking.status)}
                    </div>
                </ListGroup.Item>
            )) : <ListGroup.Item>У вас пока нет бронирований.</ListGroup.Item>}
        </ListGroup>
    );
};

export default UserBookings;

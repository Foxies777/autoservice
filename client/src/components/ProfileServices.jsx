import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Context } from '../main';
import { bookService } from '../api/bookingService';
import { fetchServices } from '../api/serviceService';

const ProfileServices = () => {
    const [services, setServices] = useState([]);
    const [filter, setFilter] = useState('all');
    const { user } = useContext(Context);

    useEffect(() => {
        if (user.isAuth) {
            fetchServices().then(data => {
                setServices(data);
            }).catch(err => {
                console.error('Не удалось загрузить услуги:', err);
            });
        }
    }, [user.isAuth]);

    const handleBookService = async (serviceId) => {
        if (!user.isAuth || !user.user.id) {
            console.log('Пожалуйста, войдите в систему для бронирования услуги.');
            return;
        }
        try {
            const response = await bookService(user.user.id, serviceId);
            alert('Услуга успешно забронирована');
        } catch (error) {
            console.error('Ошибка бронирования услуги:', error);
        }
    };

    return (
        <div>
            <Form>
                <Form.Group controlId="serviceFilter">
                    <Form.Label>Фильтр услуг</Form.Label>
                    <Form.Control as="select" value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="all">Все</option>
                        <option value="active">Активные</option>
                        <option value="past">Прошедшие</option>
                        <option value="full">Без свободных мест</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            {services.filter(service => {
                if (filter === 'active') return service.availableSlots > 0 && new Date(service.date) > new Date();
                if (filter === 'past') return new Date(service.date) < new Date();
                if (filter === 'full') return service.availableSlots === 0;
                return true;
            }).map(service => (
                <Card key={service.id}>
                    <Card.Body>
                        <Card.Title>{service.name}</Card.Title>
                        <Card.Text>
                            Дата: {new Date(service.date).toLocaleDateString()}
                            <br />
                            Доступные места: {service.availableSlots}
                        </Card.Text>
                        {service.availableSlots > 0 && (
                            <Button variant="primary" onClick={() => handleBookService(service.id)}>Забронировать</Button>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default ProfileServices;

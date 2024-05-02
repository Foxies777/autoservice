// src/components/AddServiceForm.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createService } from '../api/serviceService';

const AddServiceForm = () => {
    const [name, setName] = useState('');
    const [availableSlots, setAvailableSlots] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (new Date(date) < new Date()) {
            alert('Невозможно создать услугу с прошедшей датой');
            return;
        }
        const result = await createService(name, Number(availableSlots), date);
        if (result) {
            alert('Услуга добавлена успешно');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="serviceName">
                <Form.Label>Название услуги</Form.Label>
                <Form.Control type="text" placeholder="Введите название" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="availableSlots">
                <Form.Label>Количество мест</Form.Label>
                <Form.Control type="number" placeholder="Введите количество мест" value={availableSlots} onChange={e => setAvailableSlots(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="serviceDate">
                <Form.Label>Дата проведения</Form.Label>
                <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Добавить услугу
            </Button>
        </Form>
    );
};

export default AddServiceForm;

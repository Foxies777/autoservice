// src/api/bookingService.js
import { $authHost } from './http';

// Создание записи на услугу
export const bookService = async (userId, serviceId) => {
    const { data } = await $authHost.post('api/bookings', { userId, serviceId });
    return data;
};

// Получение всех записей пользователя
export const fetchUserBookings = async (userId) => {
    const { data } = await $authHost.get(`api/bookings/user/${userId}`);
    return data;
};

// Получение всех записей на услугу
export const fetchServiceBookings = async (serviceId) => {
    const { data } = await $authHost.get(`api/bookings/service/${serviceId}`);
    return data;
};

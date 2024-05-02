
import { $authHost } from './http';

// Получение всех услуг
export const fetchServices = async () => {
    const { data } = await $authHost.get('api/services');
    return data;
};

// Создание новой услуги
export const createService = async (name, availableSlots, date) => {
    const { data } = await $authHost.post('api/services', { name, availableSlots, date });
    return data;
};


import { $authHost, $host } from './http';
import { jwtDecode } from 'jwt-decode';

export const registration = async (formData) => {
    try {
        const { data } = await $host.post('api/user/registration', formData);
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error;
    }
};





export const login = async (username, password) => {
    console.log(`Sending login request for ${username}`);
    try {
        const { data } = await $host.post('api/user/login', { username, password });
        console.log('Login response:', data);
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (error) {
        console.error(`Login error for ${username}:`, error.response?.data || 'No response data');
        throw error;
    }
};


export const check = async () => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

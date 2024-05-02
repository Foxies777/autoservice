import { $authHost, $host } from './http';
import { jwtDecode } from 'jwt-decode';

export const registration = async (formData) => {
    const formPayload = new FormData();
    // Обход всех ключей в объекте formData
    for (const key in formData) {
        const value = formData[key];
        if (value instanceof File) {
          formPayload.append(key, value, value.name);
        } else {
          formPayload.append(key, value);
        }
      }
    
    for (let pair of formPayload.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }
    console.log('Form: ', formPayload);
    try {
        const { data } = await $host.post('api/user/registration', formPayload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Server response:', data);
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

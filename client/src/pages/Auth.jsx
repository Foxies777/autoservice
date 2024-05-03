import React, { useContext, useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import { login, registration } from '../api/authService';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE } from '../utils/consts';

const Auth = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const { user } = useContext(Context);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!isLogin) {
            if (!formData.fullName) {
                errors.fullName = 'Полное имя обязательно.';
            }
            if (!formData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                errors.email = 'Некорректный адрес электронной почты.';
            }
            if (formData.username.length < 3) {
                errors.username = 'Имя пользователя должно быть не менее 3 символов.';
            }
            if (formData.password.length < 6) {
                errors.password = 'Пароль должен быть не менее 6 символов.';
            }
            if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = 'Пароли не совпадают.';
            }
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            try {
                let data;
                if (isLogin) {
                    data = await login(formData.username, formData.password);
                    user.setUser(data.user);
                    user.setIsAuth(true);
                    navigate(user.isAdmin ? ADMIN_ROUTE : HOME_ROUTE);
                } else {
                    data = await registration({
                        fullName: formData.fullName,
                        email: formData.email,
                        username: formData.username,
                        password: formData.password
                    });
                    user.setUser(data.user);
                    user.setIsAuth(true);
                    navigate(HOME_ROUTE);
                }
            } catch (error) {
                const newErrors = error.response && error.response.data && error.response.data.errors ? error.response.data.errors : {general: error.message || 'Произошла ошибка'};
                setErrors(newErrors);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div>
            <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Полное имя" />
                        {errors.fullName && <p>{errors.fullName}</p>}
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Электронная почта" />
                        {errors.email && <p>{errors.email}</p>}
                    </>
                )}
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Имя пользователя" />
                {errors.username && <p>{errors.username}</p>}
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
                {errors.password && <p>{errors.password}</p>}
                {!isLogin && (
                    <>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Подтвердите пароль" />
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </>
                )}
                <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                <NavLink to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>{isLogin ? 'Регистрация' : 'Вход'}</NavLink>
            </form>
        </div>
    );
});

export default Auth
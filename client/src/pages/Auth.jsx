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
        confirmPassword: '',
        avatar: null
    });
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!isLogin) {
            if (!formData.fullName) {
                errors.fullName = 'Full name is required.';
            }
            if (!formData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                errors.email = 'Invalid email address.';
            }
            if (formData.username.length < 3) {
                errors.username = 'Username must be at least 3 characters long.';
            }
            if (formData.password.length < 6) {
                errors.password = 'Password must be at least 6 characters long.';
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
                    console.log(data);
                    data = await login(formData.username, formData.password);
                    user.setUser(data.user);
                    user.setIsAuth(true);
                    navigate(user.isAdmin ? ADMIN_ROUTE : HOME_ROUTE);
                } else {
                    const formDataToSend = {
                        fullName: formData.fullName,
                        email: formData.email,
                        username: formData.username,
                        password: formData.password,
                        confirmPassword: formData.confirmPassword,
                        avatar: formData.avatar
                    };
                    data = await registration(formDataToSend);
                    user.setUser(data.user);
                    user.setIsAuth(true);
                    navigate(HOME_ROUTE);
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    const newErrors = {};
                    error.response.data.errors.forEach(err => {
                        newErrors[err.path] = err.message;
                    });
                    setErrors(newErrors);
                } else {
                    alert(error.message || 'Произошла ошибка');
                }
            }
        } else {
            console.log(formErrors);
            setErrors(formErrors);
        }
    };



    return (
        <div>
            <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="ФИО" />
                        {errors.fullName && <p>{errors.fullName}</p>}
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                        {errors.email && <p>{errors.email}</p>}
                    </>
                )}
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Логин" />
                {errors.username && <p>{errors.username}</p>}
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
                {errors.password && <p>{errors.password}</p>}
                {!isLogin && (
                    <>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Подтвердите пароль" />
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

                        <input type="file" name="avatar" onChange={handleChange} />
                        {errors.avatar && <p>{errors.avatar}</p>}
                    </>
                )}
                <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                <NavLink to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>{isLogin ? 'Регистрация' : 'Вход'}</NavLink>
            </form>
        </div>
    );
});

export default Auth;

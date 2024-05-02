import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, ADMIN_ROUTE } from '../utils/consts';

const Navigation = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [userRole, setUserRole] = useState('USER');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setIsAuth(true);
                setUserRole(decodedToken.role);
            } catch (error) {
                console.error('Error decoding token', error);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuth(false);             
        navigate(LOGIN_ROUTE);          
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">MyService</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isAuth ? (
                            <>
                                <Nav.Link as={NavLink} to={PROFILE_ROUTE}>Профиль</Nav.Link>
                                {userRole === 'admin' && <Nav.Link as={NavLink} to={ADMIN_ROUTE}>Администрирование</Nav.Link>}
                                <Button variant="outline-danger" onClick={logout} style={{ marginLeft: '10px' }}>Выйти</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline-success" onClick={() => navigate(LOGIN_ROUTE)}>Войти</Button>
                                <Button variant="outline-primary" onClick={() => navigate(REGISTRATION_ROUTE)} style={{ marginLeft: '10px' }}>Регистрация</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;

import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Navigation from '../components/Navigation';

const Home = () => {
    

    return (
        <>
            <Navigation/>
            <Container className="mt-5">
                <h1>Добро пожаловать на MyService</h1>
                <p>Здесь вы можете зарегистрироваться или войти, чтобы получить доступ к услугам.</p>
            </Container>
        </>
    );
};

export default Home;

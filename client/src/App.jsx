// src/App.js
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { observer } from 'mobx-react-lite';
import { Context } from './main';
import { check } from './api/authService';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
            console.log(data);
            user.setIsAuth(true);
        }).finally(() => setLoading(false));
    }, [user]);

    if (loading) {
        return <Spinner animation='grow' />;
    }

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;

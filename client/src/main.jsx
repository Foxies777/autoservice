//main.jsx
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import User from './store/User';
import Service from './store/Service';
import Booking from './store/Booking';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new User(),
            service: new Service(),
            booking: new Booking()
        }}>
            <App />
        </Context.Provider>
    </React.StrictMode>
);

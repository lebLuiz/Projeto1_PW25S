/* eslint-disable no-alert */
import express from 'express';

const routes = express.Router();

// Routes - AUTH
routes.get('/login', (request, response) => response.render('login.html'));
routes.get('/register', (request, response) => response.render('register.html'));

// Routes - DEFAULT/HOME
routes.get('/', (request, response) => response.render('home.html'));
routes.get('/home', (request, response) => response.render('home.html'));

// Routes - TICKET
routes.get('/categories', (request, response) => response.render('categories.html'));

// Routes - TICKET
routes.get('/tickets', (request, response) => response.render('tickets.html'));

export default routes;

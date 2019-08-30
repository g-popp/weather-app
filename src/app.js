const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../views/partials');

// Setup view engine
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Georg Popp'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Georg Popp'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Georg Popp',
        message: 'Hello my Friend!'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ err });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

// Fallback routes
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Georg Popp',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Georg Popp',
        errorMessage: 'Page not found'
    });
});

// Server listen
app.listen(3000, () => {
    console.log('The server start on port 3000');
});

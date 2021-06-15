const path = require('path');

const express = require('express');
const app = express();
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

const publicFolder = path.join(__dirname, '../public');
app.use(express.static(publicFolder));

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

const renderHbsPages = (page, res, title, error) => {
  return res.render(page, { name: 'Obike Bright', title, error });
};

app.get('/', (req, res) => {
  renderHbsPages('index', res, 'Weather');
});

app.get('/about', (req, res) => {
  renderHbsPages('about', res, 'About');
});

app.get('/help', (req, res) => {
  renderHbsPages('help', res, 'Help');
});

app.get('/products', (req, res) => {
  if (!req.query.product) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.product);
  res.send({
    products: [],
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      dataRequired: 'Enter a location',
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ error: err });
      }
      res.send({
        forecastData,
        location,
        address: req.query.address.toLowerCase(),
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  renderHbsPages('404', res, '404', 'Help article not found');
});

app.get('*', (req, res) => {
  renderHbsPages(
    '404',
    res,
    '404',
    'The page you are looking for does not exist'
  );
});

app.listen(port, () => console.log('server running at port ' + port));

const request = require('postman-request');

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5d69b74d1b5cb003495e516865bf43c8&query=${
    (lat, lon)
  }&units=f`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback('unable to connect to weather service', undefined);
    } else if (res.body.error) {
      callback('Unable to get location', undefined);
    } else {
      callback(
        undefined,
        `Weather description: ${res.body.current.weather_descriptions[0]}.
It is currently ${res.body.current.temperature} degree temperature. Feels like ${res.body.current.feelslike} outside`
      );
    }
  });
};

module.exports = { forecast };

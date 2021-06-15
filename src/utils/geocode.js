const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
    address
  )}.json?&key=GB5RKGmXbvp8yAcenUi0uSKZMYGwMoKw&limit=1&units=f`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback(
        'unable to connect to weaather services, try again later',
        undefined
      );
    } else if (res.body.results.length === 0) {
      callback('please enter a correct search term', undefined);
    } else {
      callback(undefined, {
        latitude: res.body.results[0].position.lat,
        longitude: res.body.results[0].position.lon,
        location: ` ${res.body.results[0].address.countrySubdivision}, ${res.body.results[0].address.country} `,
      });
    }
  });
};

module.exports = { geocode };

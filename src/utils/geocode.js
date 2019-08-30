const request = require('request');

const geocode = (adress, callback) => {
    const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(adress) +
        '.json?access_token=pk.eyJ1IjoibWNib29zdCIsImEiOiJjano4ZGFvdXYwMWZwM2tsbGJoYTE2b2FjIn0.HNUTwyF2dYAsWDsYhb9SbA';

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;

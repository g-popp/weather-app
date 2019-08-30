const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/ca6bfc7f072fe5d8a9c69c331e4e910d/${longitude},${latitude}?units=ca`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to waether service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const currentWeatherInfo = body.currently;
            const dailySummary = body.daily.data[0].summary;

            const { temperature, precipProbability } = currentWeatherInfo;

            callback(
                undefined,
                dailySummary +
                    ` It is currenty ${temperature} degrees out.` +
                    ` There is a ${precipProbability}% chance of rain.`
            );
        }
    });
};

module.exports = forecast;

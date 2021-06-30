const request = require('request')
const chalk = require('chalk')

const forecast = (lat, lon, location, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=bc12083e70d2d22298c2df1cec7101d9'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to fetch forecast.', undefined)
        } else if (body.cod === 400) {
            callback('Unable to reach server.', undefined)
        } else {
            callback(undefined, {
                loc: location,
                temp: body.main.temp,
                des: body.weather[0].description
            }
            )
        }
    })
}

module.exports = forecast
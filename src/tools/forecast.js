
const request = require("request")
const forecast = (latitude, longitude, callback) => {
    const forecastUrl = `https://api.weatherapi.com/v1/current.json?key=3c1dd26b48534eceb44132959260109&q=${latitude},${longitude}&aqi=no`
    request({ url: forecastUrl, json: true }, (error, response) => {
        if (error) {
            callback("ERROR HAS OCCURED", undefined)
        }
        else if (response.body.error) {
            callback(response.body.error.message, undefined)
        }
        else {
            callback(undefined,
                {
                    temp: `${response.body.current.temp_c}°c`,
                    lat: response.body.location.lat,
                    lon: response.body.location.lon,
                    weather: response.body.current.condition.text,
                    wind: ` ${response.body.current.wind_kph} km/h`,
                    humidity: ` ${response.body.current.humidity} %`,
                })
        }
    })
}

module.exports = forecast
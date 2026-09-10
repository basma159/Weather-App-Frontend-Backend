
const request = require("request")
const geocode = (address, callback) => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
    request({
        url: geocodeUrl, json: true, headers: {
            "User-Agent": "MyWeatherApp/1.0"
        }
    }, (error, response) => {
        if (error) {
            callback("ERROR HAS OCCURED", undefined)
        }
        else if (response.body.length == 0) {
            callback("Unable To Find This Location", undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body[0].lat,
                longitude: response.body[0].lon,
            })
        }
    })
}

module.exports = geocode
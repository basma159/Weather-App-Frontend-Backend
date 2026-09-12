
const request = require("request")
const geocode = (address, callback) => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&accept-language=en`
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
            const trueCountry = response.body.find(c => c.addresstype == "country")
            if (trueCountry) {
                if (address.toLowerCase() == trueCountry.name.toLowerCase()) {
                    callback(undefined, {
                        latitude: trueCountry.lat,
                        longitude: trueCountry.lon,
                    })
                }
                else {
                    callback("Unable To Find This Location", undefined)
                }
            }
            else {
                callback("Unable To Find This Location", undefined)
            }
        }
    })
}

module.exports = geocode
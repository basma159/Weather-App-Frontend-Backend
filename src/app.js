const geocodeF = require("./tools/geocode")
const forecastF = require("./tools/forecast")
const express = require("express")
const hbs = require("hbs")
const app = express()
const path = require("path")
const port = process.env.PORT || 3000
const viewDirectory = path.join(__dirname, '../temp1/views')
const publicDirectory = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.set('views', viewDirectory)
app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    res.render('index', {
        img1: "/images/cloudy.png"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide address"
        })
    }
    geocodeF(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        forecastF(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData.temp,
                lat: forecastData.lat,
                lon: forecastData.lon,
                weather: forecastData.weather,
                wind: forecastData.wind,
                humidity: forecastData.humidity,
                location: req.query.address,
            })
        })
    })
})
// app.get('*', (req, res) => {
//     res.send("404 Page Not Found")
// })

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
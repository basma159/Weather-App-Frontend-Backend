const form = document.getElementById("form")
const search = document.getElementById("search")
const locationF = document.getElementById("location")
const lat = document.getElementById("lat")
const lon = document.getElementById("lon")
const forecastF = document.getElementById("forecast")
const errorF = document.getElementById("error")

form.addEventListener('submit', e => {
    e.preventDefault()
    weatherFuncion()
    form.reset()
})

const weatherFuncion = async () => {
    var loading = true
    if (loading) {
        search.style.opacity = ".5"
        search.disabled = true
        search.innerHTML = `<i class="fa-solid fa-spinner"></i> Loading`
    }

    try {
        const address = document.getElementById("address").value
        const res = await fetch(`http://localhost:3000/weather?address=${address}`)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            errorF.style.display = "flex"
            locationF.style.display = "none"
            lat.style.display = "none"
            lon.style.display = "none"
            forecastF.style.display = "none"
            errorF.innerHTML = `${data.error} <i class="fa-solid fa-exclamation"></i>`
        }
        else {
            locationF.style.display = "flex"
            lat.style.display = "flex"
            lon.style.display = "flex"
            forecastF.style.display = "flex"
            errorF.style.display = "none"
            locationF.innerHTML = `<img src=${'/images/placeholder.png'} class="w-6 h-6"> Country: ${data.location}`
            lat.innerHTML = `<img src=${'/images/internet.png'}  class="w-6 h-6"> Latitude: ${data.lat}`
            lon.innerHTML = `<img src=${'/images/internet.png'}  class="w-6 h-6"> Longitude: ${data.lon}`
            forecastF.innerHTML = `<img src=${'/images/temperature.png'}  class="w-6 h-6"> Temperature: ${data.forecast}`
        }
    }
    catch (e) {
        console.log(e)
    }
    finally {
        loading = false
        search.disabled = false
        search.style.opacity = "1"
        search.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Get Weather`
    }
}
# Weather App

A quick React weather chart app showing humidity and temperature.

Built with:

- React
- TailwindCSS
- Recharts
- Axios

## Running the app

1. Install dependencies with `npm install`
2. Create `src/config.json` with the example `src/config.json.example` file and enter the API key
3. Start with `npm run start`

## Building App

````
npm run build
````

## Decisions made

### No backend

No backend was used apart from a 3rd party API. The thinking behind this is that this is a fairly simple single page application, the only reason to add a backend would be to hide the API key by using the backend to fetch data from the weather API as opposed to doing it directly.

This would make the single-endpoint backend a proxy to the weather API.

A quick example of such a backend is included below.

````javascript
const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const apiKey = process.env.WEATHER_API_EKY

app.get('/api/weather-info/:city', (req, res) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${req.params.city}&days=3&aqi=no&alerts=no`;

  axios({
      method: 'get',
      url: url
    }).then((resp) => {
      let data = resp.data.forecast.forecastday.map((day) => {
        return {
          name: day.date,
          avg_humidity: day.day.avghumidity,
          avg_temp_c: day.day.avgtemp_c,
          avg_temp_f: day.day.avgtemp_f,
        }
      })

      res.send(data)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

````
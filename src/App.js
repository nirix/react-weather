import './App.css';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import config from './config.json'
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
      data: [],
      enableHumidity: true,
      enableTemperature: true,
      tempType: 'C',
    }

    this.fetchData = this.fetchData.bind(this)
    this.toggleHumidity = this.toggleHumidity.bind(this)
    this.toggleTemp = this.toggleTemp.bind(this)
    this.setTempC = this.setTempC.bind(this)
    this.setTempF = this.setTempF.bind(this)
  }

  fetchData(event) {
    this.setState({ city: event.target.value });

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${config.api_key}&q=${this.state.city}&days=3&aqi=no&alerts=no`;

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

      this.setState({ data: data })
    })
  }

  toggleHumidity() {
    this.setState({ enableHumidity: !this.state.enableHumidity })
  }

  toggleTemp() {
    this.setState({ enableTemperature: !this.state.enableTemperature })
  }

  setTempC() {
    this.setState({ tempType: 'C' })
  }

  setTempF() {
    this.setState({ tempType: 'F' })
  }

  render() {
    const cities = [
      { name: 'Sydney' },
      { name: 'Melbourne' },
      { name: 'Warsaw' },
      { name: 'Hong Kong' },
    ];

    let cityOptions = cities.map((city) => {
      return (
        <option value={city.name} key={city.name}>{city.name}</option>
      )
    })

    return (
      <div className="App">
        <header className="App-header">
          WeatherApp
        </header>
        <nav className="App-nav">
          <div className="city-label">
            Show weather for:
          </div>
          <select className="city-select" onChange={this.fetchData}>
            <option value="">Choose a city...</option>
            {cityOptions}
          </select>
        </nav>
        <main className="App-main">
          <LineChart
            width={800}
            height={300}
            data={this.state.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line name="Average Humidity" type="monotone" dataKey="avg_humidity" stroke="#8884d8" hide={!this.state.enableHumidity} />
            <Line name="Average Temperature" type="monotone" dataKey={this.state.tempType === 'C' ? 'avg_temp_c' : 'avg_temp_f'} stroke="#82ca9d" hide={!this.state.enableTemperature} />
          </LineChart>
        </main>
        <footer className="App-footer">
          <div className="line-toggles">
            <button className={`toggle-button ${this.state.enableHumidity ? 'active' : ''}`} onClick={this.toggleHumidity}>
              Toggle Humidity
            </button>
            <button className={`toggle-button ${this.state.enableTemperature ? 'active' : ''}`} onClick={this.toggleTemp}>
              Toggle Temperature
            </button>
          </div>
          <div className="temp-toggles">
            <button className={`toggle-button ${this.state.tempType === 'C' ? 'active' : ''}`} onClick={this.setTempC}>
              &deg;C
            </button>
            <button className={`toggle-button ${this.state.tempType === 'F' ? 'active' : ''}`} onClick={this.setTempF}>
              &deg;F
            </button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;

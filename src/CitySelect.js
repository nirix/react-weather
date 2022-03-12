import React from 'react';
import './CitySelect.css';
const allCities = require('cities-list')

class CitySelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      open: false,
      cityList: []
    }

    this.searchCity = this.searchCity.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.debounce = this.debounce.bind(this)
  }

  searchCity(e) {
    const term = e.target.value;

    // Debounce filtering to improve performance instead of checking on every character entry.
    this.debounce(() => {
      const cities = Object.keys(allCities).filter((city) => {
        return city.toLocaleLowerCase().match(term.toLocaleLowerCase())
      })

      this.setState({
        cityList: cities.slice(0, 25)
      });
    })()

    this.setState({
      city: term,
    });
  }

  onSelect(cityName) {
    this.setState({ city: cityName });
    this.props.onSelect(cityName);
  }

  debounce(func, timeout = 300){
    let timer;

    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  render() {
    const cityOptions = this.state.cityList.map((city, index) => {
      return (
        <div className="city-select-option" key={index} onMouseDown={(e) => { this.onSelect(city) }}>
          <span className="city-select-city">{city}</span>
        </div>
      )
    })

    return (
      <div
        className="city-select"
        onFocus={(e) => { this.setState({ open: true }) }}
        onBlur={(e) => { this.setState({ open: false })}}
      >
        <input
          className="city-select-input"
          type="text"
          placeholder="Search for a city..."
          value={this.state.city}
          onChange={this.searchCity}
        />
        <div className={`city-select-dropdown ${this.state.open ? 'city-select-open' : ''}`}>
          {cityOptions}
        </div>
      </div>
    );
  }
}

export default CitySelect;
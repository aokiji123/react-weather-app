import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate} from 'react-router-dom';
import { addSearch } from "../features/searchSlice";
import { AsyncPaginate } from "react-select-async-paginate";
import { citiesApi, geoApiOptions, api } from "../api";
import { dateBuilder } from "../dateBuilder";
import Logout from "./Logout";

const MainPage = () => {
  const [weather, setWeather] = useState([])
  const [search, setSearch] = useState('')
  const [latitude, setLatitude] = useState(40.7143)
  const [longitude, setLongitude] = useState(-74.006)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }

  const fetchWeatherOnCurrentLocation = async () => {
    window.navigator.geolocation.getCurrentPosition(savePositionToState)
    try {
      fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
        })
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.label) {
      dispatch(
        addSearch({
          value: search.label
        })
      )
    }
    await fetch(`${api.base}weather?q=${search.label}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
            setSearch('')
            navigate('/city', { state: { weather: result } });
        });
  };

  const handleInputChange = (searchData) => {
    setSearch(searchData)
  }

  const loadOptions = async (inputValue) => {
    return fetch(`${citiesApi}/cities?minPopulation=10000&namePrefix=${inputValue}`, geoApiOptions)
    .then(response => response.json())
    .then(response => {
      return {
        options: response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`, 
            label: `${city.name}, ${city.countryCode}`
          }
        })
      }
    })
    .catch(err => console.error(err));
  } 

  useEffect(() => {
    fetchWeatherOnCurrentLocation()
    // eslint-disable-next-line
  }, [latitude, longitude])

  return (
    <>
    <div className={
      (weather.main !== undefined) ? (
        (weather.main.temp > 16) ? 'main warm' : 'main'
      ) : 'main'}
    >
      <main>
        <form className="search__box" onSubmit={handleSubmit}>
          <AsyncPaginate 
            className="search__bar"
            placeholder="Enter the city" 
            debounceTimeout={600}
            value={search}
            onChange={handleInputChange}
            loadOptions={loadOptions}
            type="text"
          />
        </form>
        {(weather.main !== undefined) ? (
          <div>
            <h2>Your city:</h2>
            <div className="location__box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather__box">
              <div className="temperature">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ): ('')}
      </main>
    </div>

    <Logout />
    <div>
      <h4>Your searched cities:</h4>
      {/* {search.map((m) => {
        return <ul>
          <li>{m.value}</li>
        </ul>
      })} */}
    </div>
  </>
  );
}
 
export default MainPage;
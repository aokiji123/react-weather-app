import { useLocation, useNavigate } from "react-router-dom";
import { dateBuilder } from "../../dateBuilder";
import './CityPageStyles/CityPage.css'

const CityPage = () => {

  const navigate = useNavigate()
  const { state: { weather } } = useLocation();
  
  const handleSubmit = event => {
    event.preventDefault();
  
    navigate(-1);
  };
  
  return (
    <div>
      {weather.cod === '400' ? (
        <div>
          <h3>Uncorrect city name</h3>
          <button className="button__error" onClick={handleSubmit}>Back</button>
        </div>
      ) : (
        <>
        <div className={
          (weather.main !== undefined) ? (
            (weather.main.temp > 16) ? 'main warm' : 'main'
            ) : 'main'}
        >
          <main>
            <button className="button__city" onClick={handleSubmit}>Back</button>
            {(weather.main !== undefined) ? (
              <div>
                <div className="location">
                  <div className="location__data">{weather.name}, {weather.sys.country}</div>
                  <div className="location__date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather">
                  <div className="weather__temp">{Math.round(weather.main.temp)}°C</div>
                  <div className="weather__type">{weather.weather[0].main}</div>
                </div>
              </div>
            ): ('')}
          </main>
        </div>
      </>
      )}
    </div>
  );
}
 
export default CityPage;
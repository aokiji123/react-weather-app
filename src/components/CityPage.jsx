import { useLocation, useNavigate } from "react-router-dom";
import { dateBuilder } from "../dateBuilder";

const CityPage = () => {

  const navigate = useNavigate()
  const { state: { weather } } = useLocation();
  
  const handleSubmit = event => {
    event.preventDefault();
  
    navigate(-1);
  };
  
  return (
    <div>
      {weather.cod === '404' ? (
        <div>
          <h3>Uncorrect city name</h3>
          <button className="error__button" onClick={handleSubmit}>Back</button>
        </div>
      ) : (
        <>
        <div className={
          (weather.main !== undefined) ? (
            (weather.main.temp > 16) ? 'main warm' : 'main'
            ) : 'main'}
        >
          <main>
            <button className="city__button" onClick={handleSubmit}>Back</button>
            {(weather.main !== undefined) ? (
              <div>
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
      </>
      )}
    </div>
  );
}
 
export default CityPage;
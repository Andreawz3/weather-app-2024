import axios from "axios";
import { useEffect, useState } from "react"; 
import styles from './CurrentWeather.module.css';

export default function CurrentWeather({passCity}: any) {
  const [data, setData] = useState<Forecast[]>([]);
  const [city, setCity] = useState('Vancouver');

  const currentDate = new Date().toDateString().slice(4);
  const date = currentDate.slice(0, 6) + "," + currentDate.slice(6);

  let apiKey = process.env.NEXT_PUBLIC_API;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${passCity}&appid=${apiKey}&units=metric`;
  
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(url);
      setData([response.data]);
    }

    getData()

    .catch(console.error);
  },[url])

  return (
    <div>
      {
        data && data.map((d, index) => {
          return (
            <div key={index} className={styles.container}>
              <div className={styles.currentWeatherContainer}>
                <div style={{textAlign: "center"}}>
                  <h1 style={{margin: 0}} className={styles.city}>{d.name}</h1>
                  <p className={styles.country}>{d.sys.country}</p>
                  <p className={styles.update}>Last Updated: {date}</p>
                </div>
                <div style={{textAlign: "center"}}>
                  <p className={styles.currentTemp}>{d.main.temp.toFixed(0)}°C</p>
                  <p className={styles.currentWeather}>{d.weather[0].main}</p>
                </div>
              </div>
              <div className={styles.airConditionContainer}>
                <h4 className={styles.airConditionText}>Air Conditions</h4>
                <div style={{textAlign: "center"}}>
                  <p className={styles.airConditionFeels}>Feels Like</p>
                  <p className={styles.airConditionTemp}>{d.main.feels_like.toFixed(0)}°C</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}


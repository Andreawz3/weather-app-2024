import axios from "axios";
import Image from "next/image";
import styles from'./TomorrowForecast.module.css'
import { useEffect, useState } from "react"; 

export default function TomorrowForecast({passCity}: any) {
  const [data, setData] = useState<WeekForecast[]>([]);
  const [city, setCity] = useState('Vancouver');

  console.log("passCity", passCity)

  let apiKey = process.env.NEXT_PUBLIC_API;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${passCity}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(url);
      setData(response.data.list);
    }

    getData()

    .catch(console.error);
  },[url])

  console.log("url", url);

  return (
    <div className={styles.container}>
      <h3 className={styles.tmrForecastTitle}>Tomorrow's Forecast</h3>
      <div className={styles.weatherContainer}>
        {
          data && data.slice(0, 6).map((d, index) => {
            return (
              <div key={index} className={styles.forecastContainer}>
                <p className={styles.time}>{d.dt_txt.slice(11, 16)}</p>
                <Image 
                  className={styles.weatherImage}
                  src={`/${d.weather[0].main}.png`}
                  width={115}
                  height={90}
                  alt={d.weather[0].main}
                  />
                <p className={styles.temperature}>{d.main.temp.toFixed(0)}°C</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
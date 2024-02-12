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
    <div>
      <h3>Tomorrow's Forecast</h3>
      <div className={styles.weatherContainer}>
        {
          data && data.slice(0, 6).map((d, index) => {
            return (
              <div key={index}>
                <p>{d.dt_txt.slice(11, 16)}</p>
                <Image 
                  src={`/${d.weather[0].main}.png`}
                  width={150}
                  height={100}
                  alt={d.weather[0].main}
                  />
                <p>{d.main.temp.toFixed(0)}°C</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
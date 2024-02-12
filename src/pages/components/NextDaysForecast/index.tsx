import axios from "axios";
import styles from './NextDaysForecast.module.css'
import { useEffect, useState } from "react"; 

export default function NextDaysForecast({passCity}: any) {
  const [data, setData] = useState<WeekForecast[]>([]);
  // const [city, setCity] = useState('');
  const [city, setCity] = useState('Vancouver');

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

  // console.log("5-day", data);

  function getWeekDatesStartingFromToday() {
    const currentDate = new Date();
    const weekDates = [];
  
    for (let i = 0; i < 5; i++) {
      const nextDate = new Date(currentDate.getTime());
      nextDate.setDate(currentDate.getDate() + i + 1);
      weekDates.push(nextDate.toDateString());
    }
  
    return weekDates;
  }
  
  const weekDates = getWeekDatesStartingFromToday();
  // console.log(weekDates);
  
  return (
    <div className={styles.conatiner}>
      <h3 style={{fontFamily: "sans-serif"}}>5-Day Forecast</h3>
      <div className={styles.weekDatesWeather}>
        <div className={styles.weekOfWeek}>
          {
            weekDates && weekDates.map((d, index) => {
              return(
                  <p key={index}>{d.slice(0, 4)}</p>
              )
            })
          }  
        </div>
        <div className={styles.weatherContainer}>
          {
            data && data.map((d, index) => {
              return (
                Number(d.dt_txt.slice(12, 13)) === 0 ? (
                  <div key={index} className={styles.weatherInfo}>
                    <p>{d.main.temp.toFixed(1)}°C</p>
                    <p>{d.weather[0].main}</p>
                    <p>{d.clouds.all}% Chance of Precipation</p>
                  </div>
                ) : <></>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}


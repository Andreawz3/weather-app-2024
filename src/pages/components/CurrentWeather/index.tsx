import axios from "axios";
import { useEffect, useState } from "react"; 

// Components
// import Header from "./header";

export default function CurrentWeather({passCity}: any) {
  // const [data, setData] = useState([]);
  const [data, setData] = useState<Forecast[]>([]);
  const [city, setCity] = useState('Vancouver');
  // const [city, setCity] = useState('');
  // const valueCity = passCity

  // console.log("passCity", passCity);

  const currentDate = new Date().toDateString().slice(4);
  const date = currentDate.slice(0, 6) + "," + currentDate.slice(6);

  let apiKey = process.env.NEXT_PUBLIC_API;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${passCity}&appid=${apiKey}&units=metric`;

  // console.log("url", url)
  
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
            <div key={index}>
              <p>{d.name}, {d.sys.country}</p>
              <p>Last Updated: {date}</p>
              <p>Temperature: {d.main.temp.toFixed(0)}°C</p>
              <p>Current Weather: {d.weather[0].main}</p>
              <h4>Air Conditions</h4>
              <p>Feels Like: {d.main.feels_like.toFixed(0)}°C</p>
            </div>
          )
        })
      }
    </div>
  )
}


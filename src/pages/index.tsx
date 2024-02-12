import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState } from "react"; 

//  Components
import CurrentWeather from "./components/CurrentWeather";
import TomorrowForecast from "./components/TomorrowForecast";
import NextDaysForecast from "./components/NextDaysForecast";
import Footer from "./components/Footer";

export default function Home() {
  const [city, setCity] = useState('');
  const [value, setValue] = useState('');
  const [isActiveOne, setIsActiveOne] = useState(true);
  const [isActiveTwo, setIsActiveTwo] = useState(false);

  const passCity = (e: any) => {
    if(e.key === "Enter") {
        setIsActiveOne(false);
        setIsActiveTwo(true);
        setValue(city);
    }
  }

  const getCityValue = (event: any) => {
      setCity(event.target.value);
  };
  
  return (
    <div className={"body-container"} style={{height : isActiveOne ? "100vh" : "100%" }}>
      <header className={"header"}>
        <div className={"logoContainer"}>
          <Image 
            src='/logo.png'
            width={120}
            height={100}
            alt="logo"
          />
          <p>Forecast Hub</p>
        </div>
        <div>
          <input 
            className={"inputBox"}
            type="text" 
            value={city}
            placeholder="Enter Location" 
            onChange={getCityValue}
            onKeyDown={passCity}
          />
        </div>
      </header>
      <main className={"main_container"} >
        <div className={"info-container"}>
          <h1>Check the weather from any cities in the WORLD!</h1>
          <p>Just enter the city name</p>
          <p>Then you will see the current weather,tomorrow and 5-Day Forecast of that city!</p>
        </div>
        <div className={"weather-container"} style={{display: isActiveTwo ? 'flex' : 'none'}}>
          {
            city && 
            <div>
              <CurrentWeather passCity={value}/>
              <TomorrowForecast passCity={value}/>
              <NextDaysForecast passCity={value}/>
            </div>
          }
        </div>
      </main>
      <Footer />
    </div>
  );
}

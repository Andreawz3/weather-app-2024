import Image from "next/image";
import styles from "../styles/Home.module.css"
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
    <div className={styles.bodyContainer} style={{height : isActiveOne ? "100vh" : "100%" }}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src='/logo.png'
            width={120}
            height={100}
            alt="logo"
          />
          <p>Forecast Hub</p>
        </div>
        <div>
          <input 
            className={styles.inputBox}
            type="text" 
            value={city}
            placeholder="Enter Location" 
            onChange={getCityValue}
            onKeyDown={passCity}
          />
        </div>
      </header>
      <main className={styles.mainContainer} >
        <div className={styles.infoContainer}>
          <h1 className={styles.checkText}>Check the weather from any cities around the WORLD!</h1>
          <p>Enter the city name</p>
          <p>You will see the current weather, tomorrow and 5-Day Forecast of that city!</p>
        </div>
        <div className={styles.weatherContainer} style={{display: isActiveTwo ? 'flex' : 'none'}}>
          {
            city && 
            <div className={styles.weatherInfo}>
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

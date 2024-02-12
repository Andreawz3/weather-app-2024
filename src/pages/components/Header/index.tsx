import Image from "next/image";
import { useState } from "react"; 
import styles from './Header.module.css'

export default function Header() {
  const [city, setCity] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isActiveOne, setIsActiveOne] = useState(true);
  const [isActiveTwo, setIsActiveTwo] = useState(false);

//   const passCity = (event) => {
//     if(event.key === "Enter") {
//         console.log("enter");
//         setIsActiveOne(false);
//         setIsActiveTwo(true);
//     }
// }

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
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
          type="text" 
          value={city}
          placeholder="Enter Location" 
          onChange={event => setCity(event.target.value)}
          // onKeyDown={passCity}
        />
      </div>
      <div style={{display: isActiveTwo ? 'block' : 'none'}}>
          {/* <CurrentWeather passCity={city} /> */}
      </div>
    </header>
  )
}
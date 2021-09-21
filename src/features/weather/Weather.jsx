import React, {useState, useEffect} from 'react';
import styles from './Weather.module.css';

const Weather = () => {
  const [temp, setTemp] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async pos => {
      console.log(pos);
      const {latitude: lat, longitude: lon} = pos.coords;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=d7c0402acc50cf72f7709488709a7dd9`
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      setTemp(json.main.temp.toFixed(0));
      setIconUrl(
        `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
      );
    });
  });

  return (
    <section className={styles['weather']}>
      <img src={iconUrl} alt="" />
      <p className={styles['weather__temp']}>
        {temp}
        <span>&deg;</span>
      </p>
    </section>
  );
};

export default Weather;

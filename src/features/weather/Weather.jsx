import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectWeather, loadWeatherData} from './weatherSlice';
import styles from './Weather.module.css';

const Weather = () => {
  const dispatch = useDispatch();
  const weather = useSelector(selectWeather);

  useEffect(() => {
    // Make an api call every 10 minutes
    let timerId = setTimeout(function tick() {
      console.log('call to an api');
      /*
        Get current position of the device and load
        weather data using lattitude and longitude
      */
      navigator.geolocation.getCurrentPosition(pos => {
        const {latitude: lat, longitude: lon} = pos.coords;
        dispatch(loadWeatherData({lat, lon}));
      });
      timerId = setTimeout(tick, 10 * 60000);
    }, 0);

    return function cleanUp() {
      clearTimeout(timerId);
    };
  }, [dispatch]);

  return (
    weather.temp && (
      <section className={styles['weather']}>
        <img src={weather.icon} alt="" />
        <p className={styles['weather__temp']}>
          {weather.temp}
          <span>&deg;</span>
        </p>
      </section>
    )
  );
};

export default Weather;

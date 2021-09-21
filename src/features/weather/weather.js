import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getWeather} from '../../helpers/helpers';

export const loadWeatherData = createAsyncThunk(
  'loadWeatherData',
  async ({lat, lon}, thunkAPI) => {
    const apiKey = 'd7c0402acc50cf72f7709488709a7dd9';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const json = await response.json();
    return getWeather(json);
  }
);

const weather = createSlice({
  name: 'weather',
  initialState: {
    icon: '',
    temp: '',
  },
  extraReducers: {
    [loadWeatherData.fulfilled](state, action) {
      return action.payload;
    },
  },
});

export const selectWeather = state => state.weather;

export default weather.reducer;

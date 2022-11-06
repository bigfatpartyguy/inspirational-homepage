import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getWeather} from '../../helpers/helpers';
import {RootState} from '../../app/store';

export const loadWeatherData = createAsyncThunk(
  'loadWeatherData',
  async ({lat, lon}: {lat: number; lon: number}) => {
    const apiKey = 'd7c0402acc50cf72f7709488709a7dd9';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const json = await response.json();
    return getWeather(json);
  }
);

interface WeatherState {
  icon: string;
  temp: string;
}

const initialState: WeatherState = {
  icon: '',
  temp: '',
};

const weather = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadWeatherData.fulfilled, (state, action) => {
      Object.assign(state, {...action.payload});
    });
  },
});

export const selectWeather = (state: RootState) => state.weather;

export default weather.reducer;

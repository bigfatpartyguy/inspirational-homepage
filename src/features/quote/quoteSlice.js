import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getQuote} from '../../helpers/helpers';

export const loadQuote = createAsyncThunk(
  'quote/loadQuote',
  async (arg, thunkAPI) => {
    const url = 'https://quotes.rest/qod';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed. Status: ${response.status}`);
    }
    const json = await response.json();
    return getQuote(json);
  }
);

const quote = createSlice({
  name: 'quote',
  initialState: {
    author: 'Frank Gerbert',
    quote: 'Quick brown fox jumps over the lazy dog',
  },
  extraReducers: {
    [loadQuote.fulfilled](state, action) {
      state.author = action.payload.author;
      state.quote = action.payload.quote;
    },
  },
});

export const selectQuote = state => state.quote;

export default quote.reducer;

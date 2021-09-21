import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getQuote} from '../../helpers/helpers';

export const loadQuote = createAsyncThunk(
  'quote/loadQuote',
  async (arg, thunkAPI) => {
    if (localStorage.getItem('quote')) {
      return JSON.parse(localStorage.getItem('quote'));
    }
    const url = 'https://quotes.rest/qod';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed. Status: ${response.status}`);
    }
    const json = await response.json();
    const quote = getQuote(json);
    // Save quote to localStorage to avoid exceeding api rate limit
    localStorage.setItem('quote', JSON.stringify(quote));
    return quote;
  }
);

const quote = createSlice({
  name: 'quote',
  initialState: {
    author: 'John Doe',
    quote: 'Someday there will be an inpirational quote here',
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

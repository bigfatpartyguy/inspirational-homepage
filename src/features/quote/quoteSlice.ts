import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getQuote} from '../../helpers/helpers';
import {RootState} from '../../app/store';

export const loadQuote = createAsyncThunk('quote/loadQuote', async () => {
  if (sessionStorage.getItem('quote')) {
    return JSON.parse(sessionStorage.getItem('quote') as string);
  }
  const url = 'https://quotes.rest/qod';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed. Status: ${response.status}`);
  }
  const json = await response.json();
  const quote = getQuote(json);
  // Save quote to localStorage to avoid exceeding api rate limit
  sessionStorage.setItem('quote', JSON.stringify(quote));
  return quote;
});

interface QuoteState {
  author: string;
  quote: string;
}

const initialState: QuoteState = {
  author: 'John Doe',
  quote: 'Someday there will be an inpirational quote here',
};

const quote = createSlice({
  name: 'quote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadQuote.fulfilled, (state, action) => {
      Object.assign(state, {...action.payload});
    });
  },
});

export const selectQuote = (state: RootState) => state.quote;

export default quote.reducer;

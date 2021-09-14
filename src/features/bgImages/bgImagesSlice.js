import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {unsplashGetImgUrls} from '../../helpers/helpers';

export const loadImages = createAsyncThunk(
  'bgImages/loadImages',
  async ({keyword, page}, thunkAPI) => {
    const accessKey = 'PEQ3Jr5IitrLy0YFEURtFQi7FkwkFmiD5EjARydNdh8';
    const url = `https://api.unsplash.com/search/photos/?page=${page}&query=${keyword}&client_id=${accessKey}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return unsplashGetImgUrls(json);
  }
);

const images = createSlice({
  name: 'bgImages',
  initialState: {
    urls: [],
    imgPage: 0,
    isLoading: false,
    hasError: false,
  },
  reducers: {
    nextImgPage(state, action) {
      state.imgPage += 1;
    },
    prevImgPage(state, action) {
      if (state.imgPage === 0) {
        return state;
      }
      state.imgPage -= 1;
    },
  },
  extraReducers: {
    [loadImages.pending](state, action) {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadImages.fulfilled](state, action) {
      state.urls.push(...action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
  },
});

export const selectImgUrls = state => state.bgImages.urls;

export const {nextImgPage, prevImgPage} = images.actions;
export default images.reducer;

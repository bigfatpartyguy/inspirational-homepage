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
    images: [],
    imgPage: 0,
    page: 0,
    isLoading: false,
    hasError: false,
  },
  reducers: {
    nextImgPage(state, action) {
      state.imgPage += 1;
    },
    prevImgPage(state, action) {
      state.imgPage -= 1;
    },
    nextPage(state, action) {
      state.page += 1;
    },
  },
  extraReducers: {
    [loadImages.pending](state, action) {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadImages.fulfilled](state, action) {
      state.images.push(...action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
  },
});

export const selectImages = state => {
  return state.bgImages.images;
};
export const selectImgPage = state => state.bgImages.imgPage;
export const selectPage = state => state.bgImages.page;

export const {nextImgPage, prevImgPage, nextPage} = images.actions;
export default images.reducer;

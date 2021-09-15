import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {unsplashGetImgUrls} from '../../helpers/helpers';

export const loadImages = createAsyncThunk(
  'bgImages/loadImages',
  async ({page, dpr, w}, thunkAPI) => {
    const accessKey = 'PEQ3Jr5IitrLy0YFEURtFQi7FkwkFmiD5EjARydNdh8';
    const url = `https://api.unsplash.com/collections/CJOvyaBuq-A/photos/?page=${page}&client_id=${accessKey}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return unsplashGetImgUrls(json, dpr, w);
  }
);

const images = createSlice({
  name: 'bgImages',
  initialState: {
    images: [],
    imgNum: 0,
    page: 1,
    isLoading: false,
    hasError: false,
  },
  reducers: {
    nextImgNum(state, action) {
      state.imgNum += 1;
    },
    prevImgNum(state, action) {
      state.imgNum -= 1;
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
export const selectImgNum = state => state.bgImages.imgNum;
export const selectPage = state => state.bgImages.page;

export const {nextImgNum, prevImgNum, nextPage} = images.actions;
export default images.reducer;

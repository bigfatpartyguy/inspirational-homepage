import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {unsplashGetImgUrls} from '../../helpers/helpers';

export const loadImages = createAsyncThunk(
  'bgImages/loadImages',
  async ({page, dpr, w}, {rejectWithValue}) => {
    const accessKey = 'PEQ3Jr5IitrLy0YFEURtFQi7FkwkFmiD5EjARydNdh8';
    const url = `https://api.unsplash.com/collections/CJOvyaBuq-A/photos/?page=${page}&client_id=${accessKey}`;
    const response = await fetch(url);
    const json = await response.json();
    /*
    If the end of an image collection is reached, an empty array is returned
    from api. Throw an error then.
    */
    if (!json.length) {
      return rejectWithValue(new Error('end of collection'));
    }
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
    resetImgNum(state, aciton) {
      state.imgNum = 0;
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
    [loadImages.rejected](state, action) {
      state.isLoading = false;
      // Add error handler
    },
  },
});

export const selectImages = state => {
  return state.bgImages.images;
};
export const selectImgNum = state => state.bgImages.imgNum;
export const selectPage = state => state.bgImages.page;

export const {nextImgNum, prevImgNum, nextPage, resetImgNum} = images.actions;
export default images.reducer;

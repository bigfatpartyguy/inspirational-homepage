import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {unsplashGetImgUrls} from '../../helpers/helpers';
import {RootState} from '../../app/store';

export const loadImages = createAsyncThunk(
  'bgImages/loadImages',
  async (
    {page, dpr, w}: {page: number; dpr: number; w: number},
    {rejectWithValue}
  ) => {
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

interface ImagesState {
  images: Array<{
    url: string;
    author: {
      name: string;
      link: string;
    };
  }>;
  imgNum: number;
  page: number;
}

const initialState: ImagesState = {
  images: [],
  imgNum: 0,
  page: 1,
};

const images = createSlice({
  name: 'bgImages',
  initialState,
  reducers: {
    nextImgNum(state) {
      state.imgNum += 1;
    },
    prevImgNum(state) {
      state.imgNum -= 1;
    },
    nextPage(state) {
      state.page += 1;
    },
    resetImgNum(state) {
      state.imgNum = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadImages.fulfilled, (state, action) => {
      state.images.push(...action.payload);
    });
  },
});

export const selectImages = (state: RootState) => {
  return state.bgImages.images;
};
export const selectImgNum = (state: RootState) => state.bgImages.imgNum;
export const selectPage = (state: RootState) => state.bgImages.page;

export const {nextImgNum, prevImgNum, nextPage, resetImgNum} = images.actions;
export default images.reducer;

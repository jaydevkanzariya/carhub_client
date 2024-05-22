import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  review: [],
  search: "",
};

export const reviewSlice = createSlice({
  name: "Review",
  initialState: initialState,
  reducers: {
    setReview: (state, action) => {
      state.review = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setReview, setSearchItem } = reviewSlice.actions;
export const reviewReducer = reviewSlice.reducer;

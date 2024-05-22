import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewXComment: [],
  search: "",
};

export const reviewXCommentSlice = createSlice({
  name: "ReviewXComment",
  initialState: initialState,
  reducers: {
    setReviewXComment: (state, action) => {
      state.reviewXComment = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setReviewXComment, setSearchItem } = reviewXCommentSlice.actions;
export const reviewXCommentReducer = reviewXCommentSlice.reducer;

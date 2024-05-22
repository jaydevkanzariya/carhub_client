import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feature: [],
  search: "",
};

export const featureSlice = createSlice({
  name: "Feature",
  initialState: initialState,
  reducers: {
    setFeature: (state, action) => {
      state.feature = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setFeature, setSearchItem } = featureSlice.actions;
export const featureReducer = featureSlice.reducer;

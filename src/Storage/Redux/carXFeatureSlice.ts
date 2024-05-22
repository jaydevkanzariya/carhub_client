import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carXFeature: [],
  search: "",
};

export const carXFeatureSlice = createSlice({
  name: "CarXFeature",
  initialState: initialState,
  reducers: {
    setCarXFeature: (state, action) => {
      state.carXFeature = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCarXFeature, setSearchItem } = carXFeatureSlice.actions;
export const carXFeatureReducer = carXFeatureSlice.reducer;

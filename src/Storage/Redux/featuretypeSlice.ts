import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featuretype: [],
  search: "",
};

export const featuretypeSlice = createSlice({
  name: "FeatureType",
  initialState: initialState,
  reducers: {
    setFeatureType: (state, action) => {
      state.featuretype = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setFeatureType, setSearchItem } = featuretypeSlice.actions;
export const featuretypeReducer = featuretypeSlice.reducer;

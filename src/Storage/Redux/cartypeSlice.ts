import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartype: [],
  search: "",
};

export const cartypeSlice = createSlice({
  name: "CarType",
  initialState: initialState,
  reducers: {
    setCarType: (state, action) => {
      state.cartype = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCarType, setSearchItem } = cartypeSlice.actions;
export const cartypeReducer = cartypeSlice.reducer;

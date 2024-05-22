import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carXColor: [],
  search: "",
};

export const carXColorSlice = createSlice({
  name: "CarXColor",
  initialState: initialState,
  reducers: {
    setCarXColor: (state, action) => {
      state.carXColor = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCarXColor, setSearchItem } = carXColorSlice.actions;
export const carXColorReducer = carXColorSlice.reducer;

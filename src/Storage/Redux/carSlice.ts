import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  car: [],
  search: "",
};

export const carSlice = createSlice({
  name: "Car",
  initialState: initialState,
  reducers: {
    setCar: (state, action) => {
      state.car = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCar, setSearchItem } = carSlice.actions;
export const carReducer = carSlice.reducer;

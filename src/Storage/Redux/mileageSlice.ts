import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mileage: [],
  search: "",
};

export const mileageSlice = createSlice({
  name: "Mileage",
  initialState: initialState,
  reducers: {
    setMileage: (state, action) => {
      state.mileage = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setMileage, setSearchItem } = mileageSlice.actions;
export const mileageReducer = mileageSlice.reducer;

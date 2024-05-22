import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carSpecification: [],
  search: "",
};

export const carSpecificationSlice = createSlice({
  name: "CarSpecification",
  initialState: initialState,
  reducers: {
    setCarSpecification: (state, action) => {
      state.carSpecification = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCarSpecification, setSearchItem } = carSpecificationSlice.actions;
export const carSpecificationReducer = carSpecificationSlice.reducer;

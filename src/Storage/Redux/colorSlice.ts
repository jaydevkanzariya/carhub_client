import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: [],
  search: "",
};

export const colorSlice = createSlice({
  name: "Color",
  initialState: initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setColor, setSearchItem } = colorSlice.actions;
export const colorReducer = colorSlice.reducer;

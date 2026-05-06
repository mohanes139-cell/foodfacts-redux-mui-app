import { createSlice } from "@reduxjs/toolkit";

const initialState =
  JSON.parse(localStorage.getItem("savedFoods")) || [];

const savedSlice = createSlice({
  name: "saved",
  initialState,

  reducers: {
    addSaved: (state, action) => {
      const newItemId = action.payload.id || action.payload.code;

      const exists = state.find(
        (item) => (item.id || item.code) === newItemId
      );

      if (!exists) {
        state.push(action.payload);
      }
    },

    removeSaved: (state, action) => {
      return state.filter(
        (item) => (item.id || item.code) !== action.payload
      );
    },
  },
});

export const { addSaved, removeSaved } = savedSlice.actions;
export default savedSlice.reducer;
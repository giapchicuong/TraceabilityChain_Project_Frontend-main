// In userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    address: "",
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = userSlice.actions;

export const selectUserAddress = (state) => state.user.address;

export default userSlice.reducer;

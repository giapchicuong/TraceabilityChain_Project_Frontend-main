import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserAccount } from "../../services/userSevices";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  isError: false,
  userInfor: {},
};

export const fetchAccountRedux = createAsyncThunk(
  "accounts/Account",
  async (thunkAPI) => {
    try {
      const res = await getUserAccount();
      if (res && res.EC === 0) {
        return res.DT;
      } else {
        throw new Error(res.EM);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountRedux.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isError = false;
        state.isLoading = false;
        state.userInfor = action.payload;
      })
      .addCase(fetchAccountRedux.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isError = true;
        state.isLoading = false;
        state.userInfor = {};
      });
  },
});

export default accountSlice.reducer;

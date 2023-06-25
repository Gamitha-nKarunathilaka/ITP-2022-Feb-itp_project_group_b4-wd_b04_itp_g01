import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    curruntUser: null,
    isFetching: false,
    isAdmin: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.curruntUser = action.payload;
      state.isAdmin = action.payload.isAdmin;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.errors;
    },
    logout: (state) => {
      state.curruntUser = null;
      state.isAdmin = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;

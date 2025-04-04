import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, //store user data after login
  token: null //store access token
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      state.user = {...state.user, ...action.payload}
    },
    refreshToken: (state, action) => {
      state.token = action.payload; // Update token when refreshed
    },
  }
})

export const {loginSuccess, logout, updateUser, refreshToken} = userSlice.actions;

export default userSlice.reducer;
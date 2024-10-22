import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAuthState {
  user: { name: string; email: string } | null;
}

const initialState: UserAuthState = {
  user: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    initializeUser: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
      }
    },
  },
});


export const { setUser, logout, initializeUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;

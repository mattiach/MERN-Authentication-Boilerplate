import { IUser } from "@/interfaces/const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  userInfo: IUser | null;
}

const initialState: AuthState = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo") || "{}")
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload;
      Cookies.set("userInfo", JSON.stringify(action.payload), { expires: 7 });
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      Cookies.remove("userInfo");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

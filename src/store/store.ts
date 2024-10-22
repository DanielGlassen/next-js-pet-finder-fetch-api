import { configureStore } from "@reduxjs/toolkit";
import idSlice from "./reducers/idSlice";
import userLogSlice from "./reducers/userLogSlice";
import isFavouriteSlice from "./reducers/isFavouriteSlice";
import drawerSlice from "./reducers/drawerSlice";
import modalSlice from "./reducers/modalSlice";
import userAuthSlice from "./reducers/userAuthSlice";
import voteSlice from "./reducers/voteSlice";

const store = configureStore({
  reducer: {
    id: idSlice,
    userLog: userLogSlice,
    userAuth: userAuthSlice,
    isFavourite: isFavouriteSlice,
    drawer: drawerSlice,
    modal: modalSlice,
    votes: voteSlice, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

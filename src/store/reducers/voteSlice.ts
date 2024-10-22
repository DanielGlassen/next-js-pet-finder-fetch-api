import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VoteState {
  likes: any[];
  dislikes: any[];
  favourites: any[];
}

const initialState: VoteState = {
  likes: [],
  dislikes: [],
  favourites: [],
};

const voteSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {
    addLike: (state, action: PayloadAction<any>) => {
      state.likes.push(action.payload);
    },
    addDislike: (state, action: PayloadAction<any>) => {
      state.dislikes.push(action.payload);
    },
    addFavourite: (state, action: PayloadAction<any>) => {
      state.favourites.push(action.payload);
    },
  },
});

export const { addLike, addDislike, addFavourite } = voteSlice.actions;
export default voteSlice.reducer;

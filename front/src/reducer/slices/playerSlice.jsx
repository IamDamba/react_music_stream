import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "playerSlice",
  initialState: {
    player_value: undefined,
    player_id: undefined,
  },
  reducers: {
    setMediaToReducer: (state, action) => {
      state.player_id = action.payload.id;
      state.player_value = action.payload.media;
    },
  },
});

export const { setMediaToReducer } = playerSlice.actions;
export default playerSlice.reducer;

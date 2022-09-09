import { createSlice } from "@reduxjs/toolkit";

const tracksSlices = createSlice({
  name: "tracksSlice",
  initialState: {
    track_value: {},
    track_comments: [],
  },
  reducers: {
    setTrackToReducer: (state, action) => {
      state.track_value = action.payload;
    },
    setTrackCommentsToReducer: (state, action) => {
      state.track_comments = action.payload;
    },
  },
});

export const { setTrackToReducer, setTrackCommentsToReducer } =
  tracksSlices.actions;
export default tracksSlices.reducer;

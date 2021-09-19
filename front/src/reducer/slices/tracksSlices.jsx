import { createSlice } from "@reduxjs/toolkit";

const tracksSlices = createSlice({
  name: "tracksSlice",
  initialState: {
    track_value: {},
  },
  reducers: {
    setTrackToReducer: (state, action) => {
      state.track_value = action.payload;
    },
  },
});

export const { setTrackToReducer } = tracksSlices.actions;
export default tracksSlices.reducer;

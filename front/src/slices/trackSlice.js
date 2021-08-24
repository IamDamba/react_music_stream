import { createSlice } from "@reduxjs/toolkit";

const trackSlice = createSlice({
  name: "trackSlice",
  initialState: {
    trackSlice: null,
    playerAudio: {
      media: new Audio(null),
      track: {},
    },
    canPlayAudio: false,
  },
  reducers: {
    getTrackToReducer: (state, action) => {
      state.trackSlice = action.payload;
    },
    getPlayerAudioToReducer: (state, action) => {
      state.playerAudio = {
        media: new Audio(null),
        track: {},
      };
      state.playerAudio = {
        media: action.payload.media,
        track: action.payload.track,
      };
      state.canPlayAudio = action.payload.canPlayAudio;
      state.playerAudio.media.play();
    },
    handleSlicePlayPause: (state, action) => {
      state.canPlayAudio = action.payload;

      if (state.canPlayAudio) {
        state.playerAudio.media.play();
      } else {
        state.playerAudio.media.pause();
      }
    },
    handleVolume: (state, action) => {
      state.playerAudio.media.volume = action.payload;
    },
  },
});

export const {
  getTrackToReducer,
  getPlayerAudioToReducer,
  handleSlicePlayPause,
  handleVolume,
} = trackSlice.actions;
export default trackSlice.reducer;

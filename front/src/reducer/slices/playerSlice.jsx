import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "playerSlice",
  initialState: {
    player_audio: new Audio(""),
    player_value: null,
    player_image: null,
    player_id: null,
  },
  reducers: {
    setMediaToReducer: (state, action) => {
      if (
        state.player_audio.src !== null ||
        state.player_audio.src.trim() !== ""
      ) {
        state.player_audio.pause();
        state.player_audio.src = "";
      }

      state.player_id = action.payload.id;
      state.player_image = action.payload.image;
      state.player_value = action.payload.media;
      state.player_audio.src = state.player_value;

      state.player_audio.play();
    },
    setPlayPauseToPlayerAudioFromReducer: (state) => {
      if (state.player_audio.paused) {
        state.player_audio.play();
      } else {
        state.player_audio.pause();
      }
    },
    setAudioEndToReducer: (state) => {
      state.player_audio.currentTime = 0;
      state.player_audio.pause();
    },
  },
});

export const { setMediaToReducer, setPlayPauseToPlayerAudioFromReducer, setAudioEndToReducer } =
  playerSlice.actions;
export default playerSlice.reducer;

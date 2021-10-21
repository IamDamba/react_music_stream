import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "memberSlice",
  initialState: {
    member_token: localStorage.getItem("member_token") || null,
    member: {
      username: null,
      email: null,
    },
    userToDelete: null,
    canAddTrack: false,
    trackToDelete: null,
    trackToUpdate: null,
    commentToDelete: null,
    search_users: "",
    search_tracks: "",
    search_comments: "",
  },
  reducers: {
    //Member
    setMemberToReducer: (state, action) => {
      state.member = action.payload;
    },
    setMemberTokenToReducer: (state, action) => {
      state.member_token = action.payload;
      localStorage.setItem("member_token", action.payload);
    },
    resetMemberFromReducer: (state, action) => {
      localStorage.removeItem("member_token");
      state.member_token = null;
      state.member = {
        username: null,
        email: null,
      };
    },

    // Users
    setUserToDeleteFromReducer: (state, action) => {
      state.userToDelete = action.payload;
    },
    setSearchUserFromReducer: (state, action) => {
      state.search_users = action.payload;
    },

    // Tracks
    setTrackToAddFromReducer: (state, action) => {
      state.canAddTrack = action.payload;
    },
    setTrackToDeleteFromReducer: (state, action) => {
      state.trackToDelete = action.payload;
    },
    setTrackToUpdateFromReducer: (state, action) => {
      state.trackToUpdate = action.payload;
    },
    setSearchTracksFromReducer: (state, action) => {
      state.search_tracks = action.payload;
    },

    // Comments
    setCommentToDeleteFromReducer: (state, action) => {
      state.commentToDelete = action.payload;
    },
    setSearchCommentsFromReducer: (state, action) => {
      state.search_comments = action.payload;
    },

    resetDataToDeleteFromReducer: (state) => {
      state.userToDelete = null;
      state.canAddTrack = false;
      state.trackToDelete = null;
      state.trackToUpdate = null;
      state.commentToDelete = null;
    },
  },
});

export const {
  setMemberToReducer,
  setMemberTokenToReducer,
  resetMemberFromReducer,
  setSearchUserFromReducer,
  setSearchTracksFromReducer,
  setSearchCommentsFromReducer,
  setUserToDeleteFromReducer,
  setCommentToDeleteFromReducer,
  setTrackToDeleteFromReducer,
  resetDataToDeleteFromReducer,
  setTrackToUpdateFromReducer,
  setTrackToAddFromReducer,
} = memberSlice.actions;
export default memberSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "memberSlice",
  initialState: {
    member_token: localStorage.getItem("member_token") || null,
    member_tokenDuration: localStorage.getItem("member_tokenDuration") || null,
    userToDelete: null,
    canAddTrack: false,
    trackToDelete: null,
    trackToUpdate: null,
    commentToDelete: null,
    search_users: "",
    search_tracks: "",
    search_comments: "",
    search_newsletter: "",
    search_invoice: "",
  },
  reducers: {
    //Member
    setMemberTokenToReducer: (state, action) => {
      state.member_token = action.payload;
      localStorage.setItem("member_token", action.payload);
    },
    setMemberTokenDurationToReducer: (state, action) => {
      state.member_tokenDuration = action.payload;
      localStorage.setItem("member_tokenDuration", action.payload);
    },
    resetMemberFromReducer: (state) => {
      localStorage.removeItem("member_token");
      localStorage.removeItem("member_tokenDuration");
      state.member_tokenDuration = null;
      state.member_token = null;
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

    //Notifications
    setSearchNewslettersFromReducer: (state, action) => {
      state.search_newsletter = action.payload;
    },

    //Invoices
    setSearchInvoicesFromReducer: (state, action) => {
      state.search_invoice = action.payload;
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
  setMemberTokenToReducer,
  setMemberTokenDurationToReducer,
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
  setSearchNewslettersFromReducer,
  setSearchInvoicesFromReducer,
} = memberSlice.actions;
export default memberSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responseStorage: [],
  loading: false,
  error: null,
};

const responseStorageSlice = createSlice({
  name: "responseStorage",
  initialState,
  reducers: {
    setResponseStorage: (state, action) => {
      state.responseStorage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setResponseStorage, setLoading, setError } =
  responseStorageSlice.actions;

export default responseStorageSlice.reducer;

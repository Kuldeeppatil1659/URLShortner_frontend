import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "../Slices/UserProfile"; // Import the userProfileReducer
import responseStorageReducer from "../Slices/Links"; // Import the responseStorageReducer
const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    responseStorage: responseStorageReducer, // Add the responseStorageReducer to the store
  },
});

export default store;

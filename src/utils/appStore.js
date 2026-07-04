// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import feedReducer from "./feedSlice";
// import connectionReducer from "../utils/connectionSlice"; 
// import requestReducer from "../utils/requestSlice";




// const appStore = configureStore({
//     reducer: {
//         user : userReducer,
//         feed : feedReducer,
//         connection : connectionReducer,
//         request: requestReducer,
//     },
// });

// export default appStore;

// src/utils/appStore.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

// 1. Combine all your individual reducers
const appReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connections: connectionReducer,
  requests: requestReducer,
});

// 2. Create a root reducer that listens for a specific logout action
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    // Passing undefined forces all reducers to return their initial state
    state = undefined; 
  }
  return appReducer(state, action);
};

// 3. Configure the store with the root reducer
const appStore = configureStore({
  reducer: rootReducer,
});

export default appStore;
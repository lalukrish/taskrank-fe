import { configureStore } from "@reduxjs/toolkit";

import taskSlice from "./reducers/taskSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    tasks: taskSlice,
    user: userSlice,
  },
});

export default store;

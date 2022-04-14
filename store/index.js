import { configureStore } from "@reduxjs/toolkit";
import { NewsData } from "./reducers/News.reducer";


export const store = configureStore({
  reducer: {
    news: NewsData.reducer
  },
});
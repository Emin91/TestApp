import { configureStore } from "@reduxjs/toolkit";
import EventsSlice from "./eventsSlice";

export const store = configureStore({
    reducer: {
        EventsSlice
    }
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { eventsResponse } from "../../views/mainView";

export interface IEvents {
    eventsList: eventsResponse["data"];
}

const initialState: IEvents = {
    eventsList: []
};

const Events = createSlice({
    name: "Events",
    initialState,
    reducers: {
        _setEventsList(state, action: PayloadAction<any>) {
            state.eventsList = action.payload;
        }
    }
});

export const EventsSliceAction = Events.actions;
export default Events.reducer;
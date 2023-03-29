import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { EventsSliceAction } from "../modules/redux/eventsSlice";

const allActions = {
    ...EventsSliceAction
};

export const useAppDispatch = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
};

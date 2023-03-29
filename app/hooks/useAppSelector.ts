import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootStateType } from "../modules/redux/store";

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
import { useCallback, useEffect, useReducer } from "react";

type Actions =
    | { type: "START"; }
    | { type: "PAUSE"; }
    | { type: "RUNNING"; }
    | { type: "TICK"; payload: number; }
    | { type: "RESET"; payload: number; };

type State = {
    canStart: boolean;
    countdown: number;
    isRunning: boolean;
};

const reducer = (state: State, action: Actions) => {
    switch (action.type) {
        case "START":
            return { ...state, canStart: state.countdown !== 0 };
        case "RESET":
            return { ...state, countdown: action.payload, canStart: false, isRunning: false };
        case "PAUSE":
            return { ...state, canStart: false, isRunning: false };
        case "RUNNING":
            return { ...state, isRunning: true };
        case "TICK":
            return { ...state, countdown: state.countdown - action.payload };
        default: return state;
    }
};

export interface ICountdownTimerParams {
    expireImmediate?: boolean;
    resetOnExpire?: boolean;
    onExpire?: () => void;
    onReset?: () => void;
    autostart?: boolean;
    interval?: number;
    timer: number;
}

export type CountdownTimerResults = {
    countdown: string;
    isRunning: boolean;
    startTimer: () => void;
    resetTimer: () => void;
    pauseTimer: () => void;
};

export const useCountdownTimer = ({ timer, interval = 1000, autostart = false, expireImmediate = false, resetOnExpire = true, onExpire, onReset
}: ICountdownTimerParams): CountdownTimerResults => {
    const [state, dispatch] = useReducer(reducer, {
        canStart: autostart,
        countdown: timer,
        isRunning: false
    });

    const startTimer = () => {
        dispatch({ type: "START" });
    };

    const pauseTimer = () => {
        dispatch({ type: "PAUSE" });
    };

    const initStopped = (time: number) => {
        dispatch({ type: "RESET", payload: time });
    };

    const resetTimer = useCallback(() => {
        initStopped(timer);
        onReset && onReset();
    }, [timer, onReset]);

    const expire = useCallback(() => {
        initStopped(resetOnExpire ? timer : 0);
        onExpire && onExpire();
    }, [timer, onExpire, resetOnExpire]);

    useEffect(() => {
        const onTick = () => {
            if (state.countdown / 1000 <= 0 || (expireImmediate && (state.countdown - interval) / 1000 <= 0)) {
                expire();
            } else {
                dispatch({ type: "TICK", payload: interval });
            }
        };

        let id: number;
        if (state.canStart) {
            id = setInterval(onTick, interval);
            !state.isRunning && dispatch({ type: "RUNNING" });
        }
        return () => clearInterval(id);
    }, [expire, expireImmediate, interval, state.canStart, state.countdown, state.isRunning]);

    return {
        countdown: `${state.countdown.toString().slice(0, -3) || 0}`,
        isRunning: state.isRunning,
        startTimer,
        resetTimer,
        pauseTimer
    };
};

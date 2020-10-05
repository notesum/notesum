import { Reducer } from "redux";
import { UserActionTypes, UserState } from "./types";

export const initialState: UserState = {
    data: [],
    errors: undefined,
    loading: false,
};

const userReducer: Reducer<UserState> = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_REQUEST: {
            return {
                ...state,
                laoding: true,
            }
        }
        case UserActionTypes.FETCH_SUCCESS: {
            console.log("reducer:",action.payload);
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        }
        case UserActionTypes.FETCH_ERROR: {
            return {
                ...state,
                laoding: false,
                errors: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer;
import { SHOW_LOADER, HIDE_LOADER } from "../types/uiTypes";
const initialState = {
    loading: false
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                loading: true
            }
        case HIDE_LOADER:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export default projectReducer;
import { NameActions } from "../actions/nameActions";

type NameState = {
    name: string;
}

const initialState: NameState = {
    name: '',
}

const nameReducer = (state: NameState = initialState, action: NameActions) => {
    switch(action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload,
            };
        default:
            return state;
    }
}

export default nameReducer;
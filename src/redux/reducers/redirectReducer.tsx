import {
    RedirectActionTypes, REDIRECT, REDIRECTED, RedirectState
} from '../types/redirectTypes';

const initialState: RedirectState = {};

const redirectReducer = (state = initialState, action: RedirectActionTypes): RedirectState => {
    switch (action.type) {
        case REDIRECT:
            return {
                url: action.payload
            };
        case REDIRECTED:
            return {};
        default:
            return state;
    }
};

export default redirectReducer;
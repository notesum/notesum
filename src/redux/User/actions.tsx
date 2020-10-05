import { UserActionTypes, UserState } from './types';
import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type AppThunk = ActionCreator<
    ThunkAction<void, UserState, null, Action<string>>
>;

export const fetchRequest = () => {
    return (dispatch: Dispatch) => {
        console.log("Hey world");
        return fetch('http://localhost:8080/api/test')
          .then((response) => response.json())
          .then((json) => {
            console.log(json, json.msg);
              dispatch({
                type: UserActionTypes.FETCH_SUCCESS,
                payload: json,
              });

          })
          .catch((err) => {
            console.log("Error")
          })
    };
  };
export interface User {
    name: string;
}

export interface UserState {
    data: User[],
    loading: boolean,
    errors?: string;
}

export enum UserActionTypes {
    FETCH_REQUEST = "@@user/FETCH_REQUEST",
    FETCH_SUCCESS = "@@user/FETCH_SUCCESS",
    FETCH_ERROR = "@@user/FETCH_ERROR"
  }
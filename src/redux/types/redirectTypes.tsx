export const REDIRECT = 'REDIRECT';
export interface IRedirect {
    readonly type: typeof REDIRECT;
    payload: string;
}

export const REDIRECTED = 'REDIRECTED';
export interface IRedirected {
    readonly type: typeof REDIRECTED;
}

export type RedirectActionTypes =
    | IRedirected
    | IRedirect;

export interface RedirectState {
    url?: string;
}

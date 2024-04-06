interface IResponseError {
    message: string;
    timestamp: string;
    action?: 'REVOKE_SESSION' | 'REDIRECT_USER'
}

export {IResponseError}
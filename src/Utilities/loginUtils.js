let token;

export const getToken = () => {
    if(token) {
        return Promise.resolve(token);
    }
    token = localStorage.getItem('AUTH_TOKEN');
    return token;
}


export const signIn = newToken => {
    return localStorage.setItem('AUTH_TOKEN', newToken)
}

export const signOut = () => {
    token = undefined
    return localStorage.removeItem('AUTH_TOKEN')
}
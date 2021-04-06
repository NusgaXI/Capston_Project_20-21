import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    role: null,
    fullName: null,
    login: (token, userId, role, fullName, tokenExpiration) => {},
    logout: () => {}
});
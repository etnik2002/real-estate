import React , { createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    let token = localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") : null;
    let user = token ?  JSON.parse(atob(token.split('.')[1])) : {}
    console.log(user.data);

    return <UserContext.Provider value={{ user }}> {children} </UserContext.Provider>;
}

export default UserContextProvider;


import React, {createContext, useEffect, useReducer, useState} from 'react';
import users from '../data/users';
import api from '../services/api';

const initialState = {
    postAdocao:[],
    
}
const UsersContext = createContext({})

const actions = {
    createUser(state, action){
        const post = action.payload
        return {
            ...state,
            postAdocao: [...state.postAdocao, post],
        }
    },
    updateUser(state, action){
        const updated = action.payload
        return{
            ...state,
            users: state.users.map(u => u.id === updated.id ? updated : u)
        }
    },
    deleteUser(state, action){
        const user = action.payload
        console.warn(user)
        return {
            ...state,
            users: state.users.filter(u => u.id !== user.id)
        }
    }
}

export const UsersProvider = props => {
    const [postAdocao, setPostAdocao] = useState([]);
    
    
    
    //console.warn('valores do initialState', initialState)
    //console.warn('valores do postadocao', postAdocao)
    function reducer(state, action){
        //console.warn('action',action)
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <UsersContext.Provider value={{state, dispatch}} >
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersContext;
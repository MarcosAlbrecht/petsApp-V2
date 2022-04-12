import React, {createContext, useEffect, useReducer, useState} from 'react';
import users from '../data/users';
import api from '../services/api';

const initialState = {
    postAdocao:[],
    user:[],
    postPessoal:[],
}
const UsersContext = createContext({})

const actions = {
    createUser(state, action){
        const post = action.payload
        return {
            ...state,
            user: [...state.user, post],
        }
    },
    updateUser(state, action){
        const updated = action.payload
        return{
            ...state,
            user: state.users.map(u => u.id === updated.id ? updated : u)
        }
    },
    deleteUser(state, action){
        const del = action.payload
        console.warn(del)
        return {
            ...state,
            user: state.user.filter(u => u.id !== del.id)
        }
    },
    createPostAdocao(state, action){
        const post = action.payload
        return {
            ...state,
            postAdocao: [...state.postAdocao, post],
        }
    },
    updatePostAdocao(state, action){
        const updated = action.payload
        return{
            ...state,
            postAdocao: state.postAdocao.map(u => u.id === updated.id ? updated : u)
        }
    },
    deletePostAdocao(state, action){
        const post = action.payload
        console.warn(post)
        return {
            ...state,
            postAdocao: state.postAdocao.filter(u => u.id !== post.id)
        }
    },

    createPostPessoal(state, action){
        const post = action.payload
        return {
            ...state,
            postPessoal: [...state.postPessoal, post],
        }
    },
    updatePostPessoal(state, action){
        const updated = action.payload
        return{
            ...state,
            postPessoal: state.postPessoal.map(u => u.id === updated.id ? updated : u)
        }
    },
    deletePostPessoal(state, action){
        const post = action.payload
        console.warn(post)
        return {
            ...state,
            postPessoal: state.postPessoal.filter(u => u.id !== post.id)
        }
    },
    createComentarioPostPessoal(state, action){
        const post = action.payload
        return {
            ...state,
            postPessoal: {...state.postPessoal, [comentarios]: [post]},
        }
    },
}

export const UsersProvider = props => {
    const [postAdocao, setPostAdocao] = useState([]);
    
    
    
    console.warn('valores do initialState', initialState)
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
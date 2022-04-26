import React, {createContext, useEffect, useReducer, useState} from 'react';
import users from '../data/users';
import api from '../services/api';

const initialState = {
    postAdocao:[],
    user:[],
    postPessoal:[],
    comentariosPostPessoal:[],
    comentariosPostAdocao:[]
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
            user: state.user.map(u => u.id === updated.id ? updated : u)
        }
    },
    deleteUser(state, action){
        const del = action.payload
        console.warn(del)
        return {
            ...state,
            user: [],
        }
    },
    cleanUser(state){
        //const post = action.payload
        return {
            ...state,
            user: [],
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
        //let auxComents = initialState;
        //auxComents.comentariosPostPessoal.push(post);
        //setcadastroPostAdocao(auxFotos);
        return {
            ...state,
            comentariosPostPessoal: [...state.comentariosPostPessoal, post],
        }
    },
    addComentarioPostPessoal(state, action){
        const post = action.payload
        
        console.log('add comentarios', post) 
        return {
            ...state,
            comentariosPostPessoal: [...state.comentariosPostPessoal, post],
            
        } 
        console.log('entrou do add comentarios', state.comentariosPostPessoal)  
    },
    updateComentarioPostPessoal(state, action){
        const updated = action.payload
       
        return {
            ...state,
            comentariosPostPessoal: state.comentariosPostPessoal.map(u => u.id === updated.id ? updated : u)
            
        } 
        console.log('entrou do add comentarios', state.comentariosPostPessoal)  
    },
    deleteComentarioPostPessoal(state, action){
        const post = action.payload
        console.log('entrou do delete comentarios') 
        return {
            ...state,
            comentariosPostPessoal: state.comentariosPostPessoal.filter(u => u.id !== post.id),
        }
    },
    cleanComentarioPostPessoal(state){
        //const post = action.payload
        return {
            ...state,
            comentariosPostPessoal: [],
        }
    },



    createComentarioPostAdocao(state, action){
        const post = action.payload
        //let auxComents = initialState;
        //auxComents.comentariosPostPessoal.push(post);
        //setcadastroPostAdocao(auxFotos);
        return {
            ...state,
            comentariosPostAdocao: [...state.comentariosPostAdocao, post],
        }
    },
    addComentarioPostAdocao(state, action){
        const post = action.payload
        
        console.log('add comentarios', post) 
        return {
            ...state,
            comentariosPostAdocao: [...state.comentariosPostAdocao, post],
            
        } 
        console.log('entrou do add comentarios', state.comentariosPostAdocao)  
    },
    updateComentarioPostAdocao(state, action){
        const updated = action.payload
       
        return {
            ...state,
            comentariosPostAdocao: state.comentariosPostAdocao.map(u => u.id === updated.id ? updated : u)
            
        } 
        console.log('entrou do add comentarios', state.comentariosPostPessoal)  
    },
    deleteComentarioPostAdocao(state, action){
        const post = action.payload
        console.log('entrou do delete comentarios') 
        return {
            ...state,
            comentariosPostAdocao: state.comentariosPostAdocao.filter(u => u.id !== post.id),
        }
    },
    cleanComentarioPostAdocao(state){
        //const post = action.payload
        return {
            ...state,
            comentariosPostAdocao: [],
        }
    },
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
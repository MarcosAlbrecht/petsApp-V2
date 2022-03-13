import React, {createContext, useReducer} from 'react';

//const initialState = { postAdocao }
const postAdocaoPetCadastroContext = createContext({})

const actions = {
    createPostAdocao(state, action){
        const user = action.payload
        user.id = Math.random()
        return {
            ...state,
            //users: [...state.users, user],
        }
    },
    updatePostAdocao(state, action){
        const updated = action.payload
        return{
            ...state,
            //users: state.users.map(u => u.id === updated.id ? updated : u)
        }
    },
    deletePostAdocao(state, action){
        const user = action.payload
        console.warn(user)
        return {
            ...state,
            //users: state.users.filter(u => u.id !== user.id)
        }
    }
}

export const postAdocaoProvider = props => {
    function reducer(state, action){
        console.warn(action)
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

export default postAdocaoPetCadastroContext;
import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import UsersContext from '../../../context/StateContext';
import api from '../../../services/api';

// import { Container } from './styles';

const Entrar = ({ route, navigation }) => {
    const {state, dispatch} = useContext(UsersContext);
    

    useEffect(() => {
        if (state.user.length <= 0) {
            
        }
        
    }, [])
    


    return(
      <View><Text>Entrar</Text></View>
    );
}

export default Entrar;
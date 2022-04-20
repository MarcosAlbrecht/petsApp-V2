import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import UsersContext from '../../../context/StateContext';
import api from '../../../services/api';

// import { Container } from './styles';

const Cadastrar = ({ route, navigation }) => {
    const {state, dispatch} = useContext(UsersContext);
    

    useEffect(() => {
        if (state.user.length <= 0) {
            
        }
        
    }, [])
    


    return(
      <View><Text>Cadastrar</Text></View>
    );
}

export default Cadastrar;
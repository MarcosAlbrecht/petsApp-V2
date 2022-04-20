import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import UsersContext from '../../../context/StateContext';
import api from '../../../services/api';
import styles from './styles';

// import { Container } from './styles';

const Logado = ({ route, navigation }) => {
    const { state, dispatch } = useContext(UsersContext);


    useEffect(() => {
        if (state.user.length <= 0) {
            navigation.navigate('PerfilEntrar')
        }

    }, [])



    return (
        <View style={styles.container}>
            <Text>Logado</Text>
        </View>
    );
}

export default Logado;
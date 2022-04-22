import React from 'react';
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
       
    },
    productIamge: {
        width: '50%',
        height: 150,
        alignSelf: 'center',
        borderRadius: 10,
        resizeMode: 'contain', 
        borderWidth: 5,
        borderColor: 'red',             
    },
});

export default estilos;
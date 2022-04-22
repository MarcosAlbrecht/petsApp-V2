import React from 'react';
import { SectionList, StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
    ContainerInput:{
        
        //alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    textInput: {
        backgroundColor: '#ffff',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        marginHorizontal: 10,
        paddingVertical: 3,
    },
    ContainerButtons: {
        flexDirection: 'row',       
        justifyContent: 'flex-end',
        marginTop: 10,
           
    },
    btnCancelar: {
       
        marginHorizontal: 10,
        borderRadius: 5,
        width: 100, 
        backgroundColor: '#808080', 
        opacity: 0.8, 
        paddingVertical: 5  
    },
    btnSalvar: {
        marginRight: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        width: 100,
        backgroundColor: '#808080',
        opacity: 0.8, 
        paddingVertical: 5 
    },
    textButtons: {
        textAlign: 'center',
        color: '#ffff',
        fontSize: 18,
    }

});

export default estilos;
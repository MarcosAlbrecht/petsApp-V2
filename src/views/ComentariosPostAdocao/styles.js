import React from 'react';
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
    containerMensagem: {
        flex: 1,
        flexDirection:'column',

    },
    containerEnviarMensagem: {
        flexDirection: 'row',
    },
    inputContainer: {
        borderTopWidth: 1.5,
        borderTopColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
       
        
    },
    inputIcon: {
        fontSize: 24,
        color: "white",
        marginHorizontal: 5
    },
    inputIconSend: {
        color: "white"
    },
    container: {
        flex: 1,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 0,
      },
    input: {
        backgroundColor: 'white',
        width: '90%',
        height: 40,
        color: 'black',
        borderRadius: 20,
        paddingHorizontal: 10
        
    },
})

export default estilos;
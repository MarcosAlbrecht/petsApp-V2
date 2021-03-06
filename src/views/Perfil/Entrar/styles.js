import React from 'react';
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
        flex: 1,
    },
    image: {
        height: 130,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 30,
    },
    
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
    
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgot_button: {
        height: 30,
        marginBottom: 5,
    },
    
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FF1493",
    },
    
})
export default estilos;
import React from 'react';
import { StyleSheet } from 'react-native';

// import { Container } from './styles';

const estilos = StyleSheet.create({
    card: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#4F4F4F',
        marginBottom: 10,
        paddingBottom: 10,
    },
    textInput: {
        backgroundColor: '#ffff',
        borderRadius: 20,
        paddingHorizontal: 10,
        fontSize: 15,
        marginHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        

    },
    textInputDDD:{
        backgroundColor: '#ffff',
        borderRadius: 20,
        paddingHorizontal: 10,
        fontSize: 15,
        marginLeft: 10,
        paddingVertical: 5,
        marginTop: 10
    },
    textGeral: {
        alignItems: 'flex-start',
        fontSize: 18,
        color: '#fff',
        fontWeight: '400',
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingTop: 10,
    },
    productIamge: {
        width: '100%',
        height: 200,
        alignSelf: 'center',
        borderRadius: 100,
        resizeMode: 'contain',
        marginVertical: 10          
    },
    btnCard: {
        flexDirection: 'row',
        marginTop: 20,
    },
    btnSalvar: {
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 75,
        width: '40%',
        backgroundColor: '#f4511e',  
    },
    cardBtnText: {
        color: '#fff',
        marginHorizontal: 25,
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 15,
    },
})

export default estilos;
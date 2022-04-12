import React from 'react';
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
    containerHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffff',
        marginTop: 10,
        paddingVertical: 10
    },
    textNameProfile: {
        fontWeight: '800',    
    },
    containerRenderPosts: {
        backgroundColor: '#ffff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
        
    },
    productIamge: {
        width: '100%',
        height: 200,
        alignSelf: 'center',
        borderTopStartRadius: 50,    
    },
})

export default estilos;
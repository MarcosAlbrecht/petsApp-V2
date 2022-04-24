import React from 'react';
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
    container: { 
        flex: 1,       
        justifyContent: 'center',
    },
    productIamge: {
        width: '50%',
        height: 150,
        alignSelf: 'center',
        borderRadius: 100,
        resizeMode: 'contain', 
        marginTop: 30,             
    },
    linearGradient: {
        flex: 1,  
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 5,
        alignItems: 'center'      
    },
    btnSair:{     
        marginHorizontal: 10,
        borderRadius: 5,       
    },
    botao:{
        alignItems:'center',
        marginTop: 10,
        flexDirection: 'row',
        
    },
    buttonsContainer:{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: '#ffff',
        width: '95%',
        paddingHorizontal: 10,
        borderRadius: 20
        
    },
});

export default estilos;
import React from 'react';
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#312e38',
    },
    productContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        borderRadius: 5,
    },
    product: {
        flex: 1,
        margin: 8,
        backgroundColor: '#00CED1',
        padding: 10,
        borderRadius: 20,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,

        elevation: 8,  
    },
    productIamge: {
        width: '100%',
        height: 200,
        alignSelf: 'center',
        borderRadius: 20,
        
          
    },
    productTile:{
        color: '#fff',
        fontSize: 22,
        marginTop: 0,
        fontWeight: '400',
        lineHeight: 40,
        letterSpacing: 3.5,
        textAlign: 'left',
    },
    productSubTitle:{
        color: '#fff',
        fontSize: 15,
        fontWeight: '300',
        letterSpacing: 3.5,
        textAlign: 'left',
    },
    idade: {
        color: '#f3f9ff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    idadeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
       
        paddingTop: 35,

    },
    button: {
        backgroundColor: '#4f5564',
        padding: 4,
        borderRadius: 100,
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: '#f3f9ff',
        fontWeight: "800",
        padding: 4,
        fontSize: 12,
        textTransform: 'uppercase',
    }
})

export default estilos;

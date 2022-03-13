import React, {useState} from 'react';
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
    container: {     
        alignItems: 'center',  
    },
    petCarouselContainer: {
        height: 220,
        alignItems: 'center',
        backgroundColor: '#312e38',
        paddingBottom: 10,
        marginBottom: 1,
    },
    petInfosContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingTop: 5,
        marginLeft: 5,
        marginRight: 5,
        width: '97%',
       
    },
    petNomeContainer: {
        flex: 1,
        alignItems: 'flex-start',   
        width: '90%',
        paddingLeft: 5,
        paddingBottom: 10,
        

    },
    petDados1Container: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',   
        width: '90%',
        paddingLeft: 5,
        paddingBottom: 10,
        

    },
    petDados1SubContainer: {
        flex: 1,
        alignItems: 'flex-start',    

    },
    tituloText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    descricaoText: {
        fontSize: 18,
        
    },
    
})

export default estilos;

  
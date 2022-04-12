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
    containerMensagem: {
        flex: 1,
        flexDirection:'column',

    },
    userContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingTop: 5,
        marginLeft: 5,
        marginRight: 5,
        width: '97%',       
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    userContainerAvatar: {
        alignContent: 'flex-start',
        width: '10%',
        
    },
    userContainerInfos: {
        alignContent: 'flex-start',
        flex: 1,
        paddingLeft: 10,
    },
    userContainerTopDivider: {
        borderTopColor: 'black',
        borderTopWidth: 1,
        width: '90%',
        alignItems: 'center',
        paddingVertical: 10
    },
    userContainerTextInfos: {
        color: 'black',
        fontWeight: '500'
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10,
        backgroundColor: 'red',
        borderRadius: 50,
    },
      floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 35,
    },
    

    
})

export default estilos;

  
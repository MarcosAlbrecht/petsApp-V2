import React from 'react';
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
    flex: 1,
  },
  card: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#4F4F4F',
    marginBottom: 10,
    paddingBottom: 10,
  },
  image: {
    height: 130,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 30,
  },
  textGeral: {
    alignItems: 'flex-start',
    fontSize: 18,
    color: '#fff',
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  textInputDescricao: {
    backgroundColor: '#ffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    marginHorizontal: 10,
    paddingVertical: 3,
    height: 150,
  },
  containerAddPhoto: {   
    alignItems: 'center',    
    backgroundColor: 'white',
    fontSize: 15,
    marginRight: 10,
    marginLeft: 10,
    marginVertical: 20,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  textContainerAddPhoto:{
    alignItems: 'center',
    textAlign: 'center',  
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
  productIamge: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 20,
    
      
},
  
})

export default estilos;
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
  textGeral: {
    alignItems: 'flex-start',
    fontSize: 18,
    color: '#fff',
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  textInput: {
    backgroundColor: '#ffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    marginHorizontal: 10,
    paddingVertical: 3,
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
  fotosCarousel: {
    height: 220,
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 1,
    paddingHorizontal: 20,
  },
  containerAtivo: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  subContainerAtivo: {
    width: '50%',
    flex: 1,
  },
  inputIdadePet: {
    width: '30%',
    backgroundColor: '#ffff',   
    paddingHorizontal: 10,
    fontSize: 15,
    marginHorizontal: 10,
    paddingVertical: 13,
  },
  containerAddPhoto: {
    flex: 1,   
    alignItems: 'center',    
    backgroundColor: 'white',
    fontSize: 15,
    marginRight: 10,
    marginLeft: 10,
    marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  textContainerAddPhoto:{
    alignItems: 'center',
    textAlign: 'center'
  }
})

export default estilos;
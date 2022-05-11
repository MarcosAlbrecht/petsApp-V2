import React from 'react';
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    
    alignItems: "center",
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 20
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },
  forgot_button: {
    height: 30,
    marginBottom: 5,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#FF1493",
  },
  textInput: {
    backgroundColor: "#FFC0CB",
    borderRadius: 5,
    marginBottom: 20,
    width: "70%",
    alignItems: "center",
  },
  
})

export default estilos;
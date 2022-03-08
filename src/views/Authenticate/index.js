import React, { useEffect, useState } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { StatusBar, View, Image, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import usuarioService from '../../services/login';
import api from '../../services/api';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Navigation } from 'react-native-feather';

export default function Welcome(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isLoadingToken, setLoadingToken] = useState(true);

    const entrar = () => {

      let data = {
        email: email,
        password: password
      }
      
         api.get('login', {params: {email:email,password:password}})
          .then((response) => {setLoading(false),
            console.warn('Logou com sucesso',response.data.id)
            AsyncStorage.setItem("TOKEN", response.data.id)
            props.navigation.navigate('adocaoPetCadastro')
            
          })
          .catch((err) => {
            //console.error("ops! ocorreu um erro" + err);
            Alert.alert("Usuário não encontrado","Verifique se o email e senha estão corretos")
          });
      
    

      /*usuarioService.login(data)
        .then((response) => {
        setLoading(false)
        console.warn('Logou com sucesso',response.data.id)
        navigation.reset({
          index: 0,
          routes: [{name: "Principal"}]
        })
      })
      .catch((error) => {
        setLoading(false)
        Alert.alert("Usuário não existe")
      })*/
    }
    const logarComToken = (token) => {

      setLoadingToken(true)
      let data = {
        token: token
      }
      
      console.warn('token encontrado', token);
      setLoadingToken(false);
      props.navigation.navigate('adocaoPetCadastro');
    }

    useEffect(() => {
      AsyncStorage.getItem("TOKEN").then((token) => {
        logarComToken(token)
      })
    }, [])
   
    return (
      <View style={styles.container}>

        { isLoadingToken && 
          <ActivityIndicator/> 
        }

        { !isLoadingToken &&
          <>

          { !isLoading &&
          <>



          
          <Image style={styles.image} source={require("../../assets/logo2.png")} />
    
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email."
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
    
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password."
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
    
          <TouchableOpacity>
            <Text style={styles.forgot_button}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot_button}>Criar Conta</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.loginBtn} onPress={() => entrar()} >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          </>
           }
          </>
         
        }
      </View>
    );

}
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import UsersContext from '../../../context/StateContext';
import api from '../../../services/api';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { Container } from './styles';

const Entrar = ({ route, navigation }) => {
    const {state, dispatch} = useContext(UsersContext);
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    useEffect(() => {
        if (state.user.length <= 0) {
            
        }
        
    }, [])
    
  const entrar = () => {
    api
      .get('login', {params: {email: email, password: password}})
      .then(response => {
        setLoading(false), console.log('Logou com sucesso', response.data.id);
        AsyncStorage.setItem('TOKEN', response.data.id);
        dispatch({
          type: 'createUser',
          payload: response.data,
        });
        navigation.goBack();
      })
      .catch(err => {
        console.error('ops! ocorreu um erro' + err);
        Alert.alert(
          'Usuário não encontrado',
          'Verifique se o email e senha estão corretos',
        );
      });
  };

    return(
      <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
        <View style={styles.container}>

                  <Image style={styles.image} source={require("../../../assets/logo2.png")} />

                  <StatusBar style="auto" />
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Email"
                      placeholderTextColor="#003f5c"
                      onChangeText={(email) => setEmail(email)}
                    />
                  </View>

                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Senha"
                      placeholderTextColor="#003f5c"
                      secureTextEntry={true}
                      onChangeText={(password) => setPassword(password)}
                    />
                  </View>

                  <TouchableOpacity>
                    <Text style={styles.forgot_button}>Esqueceu a senha?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { navigation.navigate('PerfilCadastrar')}}>
                    <Text style={styles.forgot_button}>Criar Conta</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Text style={styles.forgot_button}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.loginBtn} onPress={() => entrar()} >
                    <Text style={styles.loginText}>LOGIN</Text>
                  </TouchableOpacity>              

            </View>

          </View>
    );
}

export default Entrar;
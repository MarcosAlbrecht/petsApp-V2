import React, {useState, useEffect} from "react";
import { Text, View, Button, Modal, ActivityIndicator, Image, StatusBar, TextInput, TouchableOpacity } from "react-native";
import styles from './styles';
import api from '../../services/api';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default ({route, navigation}) => {
    const [modal, setModal] = useState(false);

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
            setModal(false);
            
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
      
      if (token === null) {
        console.warn('token nullo'); 
        setModal(true);   
      }else{
        console.warn('token encontrado', token);
        setLoadingToken(false);
        setModal(false);
        setLoadingToken(false)
      }
      
      props.navigation.navigate('adocaoPetCadastro');
    }

    useEffect(() => {
      AsyncStorage.getItem("TOKEN").then((token) => {
        logarComToken(token)
      })
    }, [])


    return(
        <View style={{flex:1}}>
            <Text>
                Tela de Cadastro
            </Text>
            <Modal transparent={true} visible={modal}>
                <View style={{backgroundColor:'#000000aa', flex:1}}>
                    
                    <View style={styles.container}>
               

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
                    
                    </View>
                    
                </View>

            </Modal>


            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
        </View>
    )   
}
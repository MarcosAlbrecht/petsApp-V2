import React, { useState, useEffect } from "react";
import { View, Button, Modal, ActivityIndicator, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, Text } from "react-native";
import styles from './styles';
import api from '../../services/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import containerPadrao from '../../styles';
import adocaoPetCadastroContext from '../../context/adocaoPetCadastroContext';
import { Picker } from "@react-native-picker/picker";

export default ({ route, navigation }) => {
  const [modal, setModal] = useState(false);
  const [cadastroPostAdocao, setcadastroPostAdocao] = useState(route.params ? route.params : {})
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLoadingToken, setLoadingToken] = useState(true);
  const [isLoadingRaca, setLoadingRaca] = useState(true);
  const [raca, setRaca] = useState("");
  const [racaselecionada, setRacaSelecionada] = useState("");
  const [porte, setPorte] = useState(['Pequeno', 'Médio', 'Grande']);
  const [porteSelecionada, setPorteSelecionada] = useState("");
  const [pelagem, setPelagem] = useState(['Curto', 'Médio', 'Longo']);
  const [pelagemSelecionada, setPelagemSelecionada] = useState("");
  const [nomePet, setNomePet] = useState("");
  const [descricaoPet, setDescricaoPet] = useState("");
  const [idadePet, setIdadePet] = useState(1);
  const [postAtivo, setPostAtivo] = useState("SIM");
  const [idUser, setIdUser] = useState();

  const entrar = () => {

    let data = {
      email: email,
      password: password
    }

    api.get('login', { params: { email: email, password: password } })
      .then((response) => {
        setLoading(false),
          console.warn('Logou com sucesso', response.data.id)
        AsyncStorage.setItem("TOKEN", response.data.id)
        setModal(false);

      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        Alert.alert("Usuário não encontrado", "Verifique se o email e senha estão corretos")
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

  const novopost = {
    nome: nomePet,
    descricao: descricaoPet,
    idade_pet: idadePet,
    porte: porteSelecionada,
    pelagem: pelagemSelecionada,
    raca: {
      id: `${racaselecionada}` 
    },
    usuario:{ 
      id:`${idUser}`
    },
    ativo: postAtivo,
  }

  const logarComToken = (token) => {

    setLoadingToken(true)
    let data = {
      token: token
    }

    if (token === null) {
      console.warn('token nullo');
      setModal(true);
    } else {
      console.warn('token encontrado', token);
      setModal(false);
      setLoadingToken(false)
      setIdUser(token)
    }

    props.navigation.navigate('adocaoPetCadastro');
  }

  const buscarRacas = () => {
    api.get("racas")
      .then((response) => {
        setRaca(response.data),
          setLoadingRaca(false),
          console.warn('entrou no response', response.data)
      })
      .catch((err) => {
        console.warn("ops! ocorreu um erro em buscar racas" + err);

      });
  }

  const salvarPostAdocao = () => {
    console.warn('dados', novopost)
    api.post("postadocao/create", novopost)
      .then((response) => {
          console.warn('Mensagem', response);
          console.warn('Mensagem', response.data);
      }, (error) => {
        console.warn('Erro', error);  
      }
      )   
  }

  racaChange = (raca)

  useEffect(() => {
    AsyncStorage.getItem("TOKEN").then((token) => {
      logarComToken(token)

    })
    buscarRacas()
  }, [])

  

  return (
    <ScrollView style={containerPadrao.ContainerPadrao}>
      <View style={styles.card}>

        {isLoadingRaca &&
          <ActivityIndicator color="#fff" size={25} />
        }

        {!isLoadingRaca &&
          <>

            <Text style={styles.textGeral}>
              Nome do Pet
            </Text>

            <TextInput style={styles.textInput}
              onChangeText={(text) => setNomePet(text)}>
            </TextInput>

            <Text style={styles.textGeral}>
              Descrição
            </Text>

            <TextInput style={styles.textInputDescricao}
              onChangeText={(text) => setDescricaoPet(text)}
              autoCorrect={false}
              numberOfLines={10}
              multiline={true}
            >
            </TextInput>

            <Text style={styles.textGeral}>
              Raça
            </Text>

            <Picker style={styles.textInput} selectedValue={racaselecionada}
              onValueChange={(itemValue, itemIndex)=> {setRacaSelecionada(itemValue) } } >
              {
                raca.map((cr, key) => {
                  return <Picker.Item label={cr.raca} value={cr.id} key={key} />
                })
              }

            </Picker>
            
            <Text style={styles.textGeral}>
              Porte
            </Text>

            <Picker style={styles.textInput} selectedValue={porteSelecionada}
              onValueChange={(itemValue, itemIndex) => setPorteSelecionada(itemValue)}>
              {
                porte.map((cr, key) => {
                  return <Picker.Item label={cr} value={cr} />
                })
              }

            </Picker>

            <Text style={styles.textGeral}>
              Pelagem
            </Text>

            <Picker style={styles.textInput} selectedValue={pelagemSelecionada}
              onValueChange={(itemValue, itemIndex) => setPelagemSelecionada(itemValue)}>
              {
                pelagem.map((cr, key) => {
                  return <Picker.Item label={cr} value={cr} />
                })
              }

            </Picker>

            <View style={styles.btnCard}>
              <TouchableOpacity style={styles.btnSalvar} onPress={() => {salvarPostAdocao(), navigation.popToTop(), console.log('castro',cadastroPostAdocao)}}>
                <Text style={styles.cardBtnText}>Salvar</Text>

              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSalvar} onPress={() => navigation.popToTop()}>
                <Text style={styles.cardBtnText}>Cancelar</Text>

              </TouchableOpacity>
            </View>

          </>
        }

        <Modal transparent={true} visible={modal}>
          <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
            <View style={styles.container}>

              {!isLoading &&
                <>

                  <Image style={styles.image} source={require("../../assets/logo2.png")} />

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
                  <TouchableOpacity>
                    <Text style={styles.forgot_button}>Criar Conta</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Text style={styles.forgot_button}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.loginBtn} onPress={() => entrar()} >
                    <Text style={styles.loginText}>LOGIN</Text>
                  </TouchableOpacity>


                </>
              }

            </View>

          </View>

        </Modal>


      </View>
    </ScrollView>
  )
}
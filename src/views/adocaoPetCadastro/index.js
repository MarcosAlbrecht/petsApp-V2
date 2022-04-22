import React, { useState, useEffect, useContext } from "react";
import { View, Button, Modal, ActivityIndicator, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, Text, Alert } from "react-native";
import styles from './styles';
import api from '../../services/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import containerPadrao from '../../styles';
import adocaoPetCadastroContext from '../../context/adocaoPetCadastroContext';
import { Picker } from "@react-native-picker/picker";
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import { SliderBox } from "react-native-image-slider-box";
import cameraIcon from '../../assets/add-camera-icon.png';
import { Avatar, BottomSheet, ListItem, Icon } from 'react-native-elements';
import UsersContext from '../../context/StateContext';
import RNFetchBlob from 'react-native-fetch-blob';
import { color } from "react-native-reanimated";


export default ({ route, navigation }) => {
  const {state, dispatch} = useContext(UsersContext);
  const [modal, setModal] = useState(false);
  const [cadastroPostAdocao, setcadastroPostAdocao] = useState(route.params ? route.params : {fotos:[], raca:{id:{}} })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLoadingToken, setLoadingToken] = useState(true);
  const [isLoadingRaca, setLoadingRaca] = useState(true);
  const [raca, setRaca] = useState("");
  const [racaselecionada, setRacaSelecionada] = useState("");
  const [porte, setPorte] = useState(['Pequeno', 'Médio', 'Grande','Gigante']);
  const [porteSelecionada, setPorteSelecionada] = useState("Pequeno");
  const [pelagem, setPelagem] = useState(['Curto', 'Médio', 'Longo']);
  const [pelagemSelecionada, setPelagemSelecionada] = useState("Curto");
  const [nomePet, setNomePet] = useState("");
  const [descricaoPet, setDescricaoPet] = useState("");
  const [idadePet, setIdadePet] = useState();
  const [postAtivo, setPostAtivo] = useState("");
  const [postAtivoSelecao, setPostAtivoSelecao] = useState(['SIM', 'NÃO']);
  const [idUser, setIdUser] = useState();
  const [fotos, setFotos] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRemoveFoto, setIsVisibleRemoveFoto] = useState(false);
  const [loadPicture, setLoadPicture] = useState({fotos: []});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [imagemPressionada, setImagemPressionada] = useState();

  const list = [
    {
      title: 'Câmera',
      onPress: () => {
        setIsVisible(false),
        console.warn('pressionado botao de camera'),
        addPhotoCamera();
        
      },
      icon: 'camera-alt'
    },
    {
      title: 'Galeria',
      onPress: () => {
        setIsVisible(false),
        console.warn('pressionado botao de galeria'),
        addImagem();
      },
      icon: 'image'
    },
    {
      title: 'Cancelar',
      containerStyle: { backgroundColor: '#f4511e' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
      icon: 'cancel',
      iconColor: '#ffffff'
    },
  ];

  const listRemoverFoto = [
    {
      title: 'Remover Foto',
      onPress: () => {
        setIsVisibleRemoveFoto(false),
        console.warn('pressionado botao de galeria'),
        deleteImagem();
      },
      icon: 'image'
    },
    {
      title: 'Cancelar',
      containerStyle: { backgroundColor: '#f4511e' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisibleRemoveFoto(false),
      icon: 'cancel',
      iconColor: '#ffffff'
    },  
  ];

  const novopost = {
    nome: cadastroPostAdocao.nome,
    descricao: cadastroPostAdocao.descricao,
    idade_pet: cadastroPostAdocao.idade_pet,
    porte: cadastroPostAdocao.porte,
    pelagem: cadastroPostAdocao.pelagem,
    latitude: '',
    longitude: '',
    raca: {
      id: `${cadastroPostAdocao.raca}`
    },
    usuario: {
      id: `${idUser}`
    },
    ativo: cadastroPostAdocao.ativo,
    fotos: cadastroPostAdocao.fotos,
  }

  const deleteImagem = () => {
    //setLoadPicture({ fotos: [...loadPicture.fotos, 'https://images.ecycle.com.br/wp-content/uploads/2021/05/20195924/o-que-e-paisagem.jpg'] })
    cadastroPostAdocao.fotos.splice(imagemPressionada,1);
    let auxFotos = cadastroPostAdocao;
    auxFotos.fotos.splice(imagemPressionada,0);
    setcadastroPostAdocao(auxFotos);

    setImagemPressionada();
  }

  const addImagem = () => {
    //setLoadPicture({ fotos: [...loadPicture.fotos, 'https://images.ecycle.com.br/wp-content/uploads/2021/05/20195924/o-que-e-paisagem.jpg'] })
    ImagePicker.openPicker({
      width: 500,
      height: 300,
      cropping: true
    }).then(image => {
      console.log(image);
      convertBase64(image)
    });
  }

  const addPhotoCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      convertBase64(image)
    });
  }

  const convertBase64 = (image) => {
    console.log('url da imagem',(image.path));
    //console.log('tamanho array', loadPicture.fotos.length);
    //setLoadPicture(loadPicture)
    RNFetchBlob.fs.readFile(image.path, 'base64')
    .then((data) => {
      // handle the data ..
      if (cadastroPostAdocao.fotos.length >= 3) {
        Alert.alert('Limite excedido','É possível incluir apenas 3 fotos');  
      }else{
        try {
          var dadosimagem = `data:${image.mime};base64,${data}`;
          console.log('dados imagem', dadosimagem)
          //setLoadPicture({ fotos: [...loadPicture.fotos, dadosimagem]})
          setLoadPicture({fotos: [...loadPicture.fotos, dadosimagem]});
          let auxFotos = cadastroPostAdocao;
          auxFotos.fotos.push(dadosimagem);
          setcadastroPostAdocao(auxFotos);

          //console.log(loadPicture.fotos.length);
          //console.warn('loadpicture', loadPicture);
          //cadastroPostAdocao.fotos.splice(cadastroPostAdocao.fotos.length-1, 0, cadastroPostAdocao.fotos.splice(cadastroPostAdocao.fotos.length,1)[0])
          //setcadastroPostAdocao({...cadastroPostAdocao, [fotos]:[ loadPicture.fotos]})
          
          console.log('apos a', cadastroPostAdocao)
          //cadastroPostAdocao.fotos.splice(0,1)  
        } catch (error) {
          console.warn('erro', error)  
        }
        
        //console.log('fotos dados',`data:${image.mime};base64,${data}`);
        //console.log('tamanho array', loadPicture.fotos.length)
       
       // console.log('fotos cadastropet', loadPicture)
      }
    })
  }

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
        setcadastroPostAdocao({...cadastroPostAdocao, usuario: { id : response.data.id }});
        dispatch({
          type: 'createUser',
          payload: response.data,
      });
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        Alert.alert("Usuário não encontrado", "Verifique se o email e senha estão corretos")
      });

  }

  const entrarComId = (id) => {
    api.get('loginId', { params: { idUser: id } })
      .then((response) => {
        setLoading(false),
        console.warn('Logou com sucesso entrou Com Id', response.data.id)
        AsyncStorage.setItem("TOKEN", response.data.id)
        setModal(false);       
        setLoadingToken(false);
        setIdUser(id);
        dispatch({
          type: 'createUser',
          payload: response.data,
        });
        console.warn('dados user no state', state.user);
        if (route.params == null) {
          setcadastroPostAdocao({...cadastroPostAdocao, usuario: { id : response.data.id }})
          //setLoadPicture([...loadPicture.fotos, cadastroPostAdocao.fotos]})
          //setLoadPicture(loadPicture => [...loadPicture, cadastroPostAdocao.fotos]);
        }
        
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        Alert.alert("Usuário não encontrado", "Ocorreu um erro ao logar!")
      });
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
      console.warn('user no state', state.user);
      if (state.user.length <= 0) {      
        entrarComId(token) 
        console.warn('entrou no IF');                
      }
      
      // setModal(false);
      // setLoadingToken(false)
      // setIdUser(token)
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
    console.log('route params', route);
    console.log('valor editado do postadocao', cadastroPostAdocao); 
    if (route.params != null) {
      console.log('esta editando - novo nome', cadastroPostAdocao.nome);
      api.put("postadocaoupdate/"+cadastroPostAdocao.id, cadastroPostAdocao)
        .then((response) => {
          //console.warn('Mensagem', response);
          //console.warn('Mensagem', response.data);
          dispatch({
            type: 'updatePostAdocao',
            payload: response.data,
          });
          Alert.alert('Sucesso!', 'Post alterado com sucesso.');
          }, (error) => {
            console.warn('Erro', error);
          }
        )
      

    }else{
      //setcadastroPostAdocao({...cadastroPostAdocao.usuario, usuario: { id : idUser }})
      cadastroPostAdocao.fotos.splice(0,1)
      console.warn('cadastrando dados', cadastroPostAdocao)
      api.post("postadocao/create", cadastroPostAdocao)
        .then((response) => {
          //console.warn('Mensagem', response);
          //console.warn('Mensagem', response.data);
          dispatch({
            type: 'createPostAdocao',
            payload: response.data,
          });
          Alert.alert('Sucesso!', 'Post cadastrado com sucesso.');
          }, (error) => {
            console.warn('Erro', error);
          }
        )
    }  
  }

  racaChange = (raca)

  useEffect(() => {
    if (state.user.length <= 0) {
      AsyncStorage.getItem("TOKEN").then((token) => {
        logarComToken(token),
        console.log('entrou nop token');

      })
    }
    buscarRacas();
    console.log('valor inicial do postadocao', cadastroPostAdocao);
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
              onChangeText={nome => setcadastroPostAdocao({...cadastroPostAdocao, nome})}
              value={cadastroPostAdocao.nome}>
            </TextInput>

            <Text style={styles.textGeral}>
              Descrição
            </Text>

            <TextInput style={styles.textInputDescricao}
              onChangeText={descricao => setcadastroPostAdocao({...cadastroPostAdocao, descricao})}
              autoCorrect={false}
              numberOfLines={10}
              multiline={true}
              value={cadastroPostAdocao.descricao}
            >
            </TextInput>

            <Text style={styles.textGeral}>
              Raça
            </Text>
            {console.log('antes do piker', cadastroPostAdocao)}
            <Picker style={styles.textInput} selectedValue={cadastroPostAdocao.raca.id}
              onValueChange={(raca, itemIndex) =>  setcadastroPostAdocao( {...cadastroPostAdocao, raca: {id: raca}})} >
              {
                raca.map((cr, key) => {
                  return <Picker.Item label={cr.raca} value={cr.id} key={key} />
                })
              }

            </Picker>

            <Text style={styles.textGeral}>
              Porte
            </Text>

            <Picker style={styles.textInput} selectedValue={cadastroPostAdocao.porte}
              onValueChange={(porte, itemIndex) => setcadastroPostAdocao({...cadastroPostAdocao, porte})}>
              {
                porte.map((cr, key) => {
                  return <Picker.Item label={cr} value={cr} />
                })
              }

            </Picker>

            <Text style={styles.textGeral}>
              Pelagem
            </Text>

            <Picker style={styles.textInput} selectedValue={cadastroPostAdocao.pelagem}
              onValueChange={(pelagem, itemIndex) => setcadastroPostAdocao({...cadastroPostAdocao, pelagem})}>
              {
                pelagem.map((cr, key) => {
                  return <Picker.Item label={cr} value={cr} />
                })
              }

            </Picker>

            <View style={styles.containerAtivo}>
              <View style={styles.subContainerAtivo}>
                <Text style={styles.textGeral}>
                  Ativo
                </Text>

                <Picker style={styles.textInput} selectedValue={cadastroPostAdocao.ativo}
                  onValueChange={(ativo, itemIndex) => setcadastroPostAdocao({...cadastroPostAdocao, ativo})}>
                  {
                    postAtivoSelecao.map((cr, key) => {
                      return <Picker.Item label={cr} value={cr} />
                    })
                  }

                </Picker>
              </View>

              <View style={styles.subContainerAtivo}>
                <Text style={styles.textGeral}>
                  Idade Pet
                </Text>

                <TextInput style={styles.inputIdadePet} keyboardType="decimal-pad"
                  onChangeText={idade_pet => setcadastroPostAdocao({...cadastroPostAdocao, idade_pet})}
                  value={cadastroPostAdocao.idade_pet}>
                </TextInput>
              </View>
            </View>

            <TouchableOpacity onPress={()=>{setIsVisible(true)}}>       
              <View style={styles.containerAddPhoto}>
                    <Icon name="photo-camera" size={30}/>
                    <Text style={styles.textContainerAddPhoto}>Clique aqui para adicionar uma foto ou imagem. (Limite de 3)</Text>
              </View>
            </TouchableOpacity>      
            <Text style={styles.textGeral}>
              Fotos
            </Text>
            

            <SliderBox images={cadastroPostAdocao.fotos}
              sliderBoxHeight={200}
              dotColor="#FFEE58"
              circleLoop
              ImageComponentStyle={{ borderRadius: 15, width: '90%', marginTop: 5, marginRight: 15 }}
              onCurrentImagePressed={(index) => {setIsVisibleRemoveFoto(true), setImagemPressionada(index), console.log(imagemPressionada)}}
            />

            <BottomSheet modalProps={{}} isVisible={isVisible}>
              {list.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={l.containerStyle}
                  onPress={l.onPress}
                >
                  <Icon name={l.icon} color={l.iconColor}/>
                  <ListItem.Content>
                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </BottomSheet>

            <BottomSheet modalProps={{}} isVisible={isVisibleRemoveFoto}>
              {listRemoverFoto.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={l.containerStyle}
                  onPress={l.onPress}
                >
                  <Icon name={l.icon} />
                  <ListItem.Content>
                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </BottomSheet>


            <View style={styles.btnCard}>
              <TouchableOpacity style={styles.btnSalvar} onPress={() => { salvarPostAdocao(), navigation.popToTop(), console.log('castro', cadastroPostAdocao) }}>
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
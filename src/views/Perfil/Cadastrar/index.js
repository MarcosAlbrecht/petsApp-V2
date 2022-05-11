import React, { useState, useEffect, useContext } from 'react';
import UsersContext from '../../../context/StateContext';
import api from '../../../services/api';
import apiViaCep from '../../../services/apiViaCep';
import containerPadrao from '../../../styles';
import styles from './styles';
import { 
  Text,
  View,
  ScrollView,
  TextInput, 
  Image,
  TouchableOpacity,
  Alert} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import { Icon, BottomSheet, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { set } from 'react-native-reanimated';


// import { Container } from './styles';

const Cadastrar = ({ route, navigation }) => {
    const {state, dispatch} = useContext(UsersContext);
    const [user, setUser] = useState(route.params.value ? route.params.value : { foto:"", endereco:{id:""} })
    const [isVisible, setIsVisible] = useState(false);
    const [endereco, setEndereco] = useState(); 
    const [cep, setCep] = useState();
    
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

    useEffect(() => {
        console.log('value user', route.params.value)
        if (route.params.editando) {
          //console.log('entrou no id - user id', user.endereco.id)
          api.get('enderecoid/'+user.endereco.id)
          .then((response) => {
            setEndereco(response.data);
            console.log('entrou no id', response.data)

          })
          .catch((err) => {
            console.log('Ocorreu um erro ao listar o endereco', err)
          })    
        }else console.log('entrou no else')
        
    }, [])
    
    const deleteImagem = () => {
      //setLoadPicture({ fotos: [...loadPicture.fotos, 'https://images.ecycle.com.br/wp-content/uploads/2021/05/20195924/o-que-e-paisagem.jpg'] })
      //cadastroPostAdocao.fotos.splice(imagemPressionada,1);
      //let auxFotos = cadastroPostAdocao;
      //auxFotos.fotos.splice(imagemPressionada,0);
      //setcadastroPostAdocao(auxFotos);
  
      //setImagemPressionada();
      setUser({...user, foto: ""});
    }
  
    const addImagem = () => {
      //setLoadPicture({ fotos: [...loadPicture.fotos, 'https://images.ecycle.com.br/wp-content/uploads/2021/05/20195924/o-que-e-paisagem.jpg'] })
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        console.log(image);
        convertBase64(image)
      });
    }
  
    const addPhotoCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        console.log(image);
        convertBase64(image)
      });
    }
  
    const convertBase64 = (image) => {
      //console.log('url da imagem',(image.path));     
      RNFetchBlob.fs.readFile(image.path, 'base64')
      .then((data) => {
        // handle the data ..
        
          try {
            var dadosimagem = `data:${image.mime};base64,${data}`;
            console.log('dados imagem', dadosimagem)            
            setUser({...user, foto: dadosimagem});      
            console.log('apos a', user)  
          } catch (error) {
            console.warn('erro', error)  
          }       
      })
    }

    const pesquisarCep = (value) => {
      let cep2;
      cep2 = value.replace('-','')
      console.log(cep2)
      setUser({...user, cep: value});
      console.log('user', user);
      if (cep2.length === 8) {
       //console.clear;
       console.log('Entrou no IF api via cep', cep+'/json/')
       
       apiViaCep.get(cep2+'/json')
       .then((response) => {
         setEndereco(response.data)
         
         if (response.data != null) {
          if (response.data.erro) {
            console.log('erro', endereco) 
            Alert.alert('CEP Inválido','CEP inválido, digite um novo cep para continuar')
          }else
            console.log('sucesso', endereco) 
         }
                    
       })
       .catch((err) => {
         console.warn("ops! ocorreu um erro em buscar enderecos" + err);
       });        
      }          
    }

    const salvarUsuario = () => {
      console.log('editando?', route.params.editando);
      if (route.params.editando) {
        let enderecoId;
        enderecoId = user.endereco.id;
        let aux;
        aux = endereco;
        endereco.id = enderecoId
        //setEndereco({...endereco, id: enderecoId}) ;
        setEndereco(aux);
        //setcadastroPostAdocao({...cadastroPostAdocao, usuario: { id : response.data.id }});
        console.log('editando endereco', endereco); 
        api.put('enderecoupdate', endereco)
        .then((response) => {
          let userAux;
          userAux = user;
          userAux.endereco.id = response.data.id;
          setUser(userAux);

          console.log('valores do user', response.data);

          api.put('usersupdate/'+user.id, user)
          .then((retorno) => {
            dispatch({
              type: 'updateUser',
              payload: retorno.data,
            })
            AsyncStorage.setItem("TOKEN", retorno.data.id)  
            }).catch((err) => {
              console.log('Ocorreu um erro ao salvar usuario', err)
            });
            Alert.alert('Editado','Usuário editado com sucesso!')
            

        }).then((err) => {
          console.warn('ocorreu um erro ao inserir endereco', err);
          
        });  
        
      }else{

        api.post('endereco/create', endereco)
        .then((response) => {
          let userAux;
          userAux = user;
          userAux.endereco.id = response.data.id;
          setUser(userAux);

          console.log('valores do user', response.data);

          api.post('users/create', user)
          .then((retorno) => {
            dispatch({
              type: 'createUser',
              payload: retorno.data,
            })
            AsyncStorage.setItem("TOKEN", retorno.data.id)  
            }).catch((err) => {
              console.log('Ocorreu um erro ao salvar usuario', err)
            })


        }).then((err) => {
          console.warn('ocorreu um erro ao inserir endereco', err)
        });

      }
      
    }

    return(
      <ScrollView style={containerPadrao.ContainerPadrao}>
        <View style={styles.card}>

          <Image 
            source={{uri: user.foto}}
            style={styles.productIamge}
          >

          </Image>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>{setIsVisible(true)}}>
              <Text style={{color: '#ffff', fontWeight:'700'}}>Adicionar foto</Text>
            </TouchableOpacity>
          </View>

          <TextInput style={styles.textInput}
            
            onChangeText={nome => setUser({...user, nome})}
            value={user.nome}
            placeholder={"Nome completo:"}
            >
          </TextInput>
          <TextInput style={styles.textInput}    
            onChangeText={apelido => setUser({...user, apelido})}
            value={user.apelido}
            placeholder={"Nome de usuário:"}
            >
          </TextInput>
          <TextInputMask style={styles.textInput}
            type={'cpf'}
            onChangeText={cpf => setUser({...user, cpf})}
            value={user.cpf}
            placeholder={"CPF:"}
            keyboardType='number-pad'            
            >
          </TextInputMask>
          <View style={{flexDirection:'row'}}>
            <View style={{width: '20%'}}>
              <TextInput style={styles.textInputDDD}       
                onChangeText={ddd => setUser({...user, ddd})}
                value={route.params.editando ? user.ddd.toString() : user.ddd}
                placeholder={"DDD:"}
                keyboardType='numeric'
                >
              </TextInput>
            </View>
            <View style={{width: '80%'}}>
              <TextInputMask style={styles.textInput}
                type={'cel-phone'} 
                options={{
                  withDDD: false
                }}      
                onChangeText={telefone => setUser({...user, telefone})}
                value={user.telefone}
                placeholder={"Celular:"}
                keyboardType='phone-pad' 
                >
              </TextInputMask>
            </View>

          </View>
          <TextInput style={styles.textInput}   
            onChangeText={email => setUser({...user, email})}
            value={user.email}
            placeholder={"Email:"}
            keyboardType='email-address'         
            >
          </TextInput>
          <TextInput style={styles.textInput}   
            onChangeText={password => setUser({...user, password})}
            value={user.password}
            placeholder={"Senha:"} 
            secureTextEntry={true}        
            >
          </TextInput>

          <View style={{flexDirection:'row'}}>
            <View style={{width: '20%'}}>
              <TextInput style={styles.textInputDDD}       
                onChangeText={idade => setUser({...user, idade})}
                value={user.idade}
                placeholder={"Idade:"}
                keyboardType='numeric'
                >
              </TextInput>
            </View>
            <View style={{width: '80%'}}>
              
              
            </View>
          </View>
          <View>
            <View style={{ borderTopWidth: 2, borderTopColor: '#fff', marginVertical: 20}}>
              <View style={{ alignItems: 'center'}}>
                <Text style={{ alignItems: 'center',color: '#ffff', fontWeight:'700', marginVertical: 10}}>Dados de endereço</Text>
              </View>
              <TextInputMask style={styles.textInput}
                type={'zip-code'}      
                onChangeText={cep => {cep.length >= 9 ? pesquisarCep(cep) :setCep("")}}
                value={user.cep}
                placeholder={"CEP:"}
                keyboardType='number-pad'
                >
              </TextInputMask>
              <TextInput style={styles.textInput}    
                onChangeText={localidade => setEndereco({...endereco, localidade})}
                value={endereco != null ? endereco.localidade : null}
                placeholder={"Cidade:"}
                >
              </TextInput>
              <TextInput style={styles.textInput}    
                onChangeText={bairro => setEndereco({...endereco, bairro})}
                value={endereco != null ? endereco.bairro : null}
                placeholder={"Bairro:"}
                >
              </TextInput>
              <TextInput style={styles.textInput}    
                onChangeText={logradouro => setEndereco({...endereco, logradouro})}
                value={endereco != null ? endereco.logradouro : null}
                placeholder={"Logradouro:"}
                >
              </TextInput>
              <TextInput style={styles.textInput}    
                onChangeText={complemento => setEndereco({...endereco, complemento})}
                value={endereco != null ? endereco.complemento : null}
                placeholder={"Complemento:"}
                >
              </TextInput>
              <View style={{flexDirection:'row'}}>
            <View style={{width: '30%'}}>
              <TextInput style={styles.textInputDDD}       
                onChangeText={numero => setUser({...endereco, numero})}
                value={endereco != null ? endereco.numero : null}
                placeholder={"Número:"}
                keyboardType='numeric'
                >
              </TextInput>
            </View>
            <View style={{width: '20%'}}>
              <TextInput style={styles.textInputDDD}       
                onChangeText={uf => setUser({...endereco, uf})}
                value={endereco != null ? endereco.uf : null}
                placeholder={"UF:"}  
                >
              </TextInput>
            </View>
            <View style={{width: '70%'}}>
              
              
            </View>
          </View>
              
            </View>
          </View>
            

          <View style={styles.btnCard}>
            <TouchableOpacity style={styles.btnSalvar} onPress={() => { salvarUsuario(), navigation.popToTop() }}>
              <Text style={styles.cardBtnText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSalvar} onPress={() => navigation.popToTop()}>
              <Text style={styles.cardBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>

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

        </View>

      </ScrollView>
    );
}

export default Cadastrar;
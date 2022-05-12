import React, {useContext, useEffect, useState} from 'react';
import { View, Text, FlatList, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import UsersContext from '../../context/StateContext';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import style from '../../styles';

// import { Container } from './styles';

const ComentariosPostPessoal = ({route, navigation}) => {
    console.warn('comentarios', route)
    const [postPessoal, setpostPessoal] = useState(route.params ? route.params : {});
    const [comentarios, setComentarios] = useState();
    const [idUsuarioLogado, setIdUsuarioLogado] = useState();
    const [comentario, setComentario] = useState();
    const [carregando, setCarregando] = useState(true);
    const {state, dispatch} = useContext(UsersContext);
    

    const novoComentario = {
        comentario: comentario,
        usuario: {
            id: `${idUsuarioLogado}`
        }, 
        postPessoal: {
            id: `${postPessoal.id}`
        },  
    }
    useEffect(() => {
        dispatch({
            type: 'cleanComentarioPostPessoal',
            //payload: element,
        })

        api.get(`comentariosPessoal/${postPessoal.id}`)
            .then((response) => {
                response.data.forEach(element => {
                  dispatch({
                      type: 'createComentarioPostPessoal',
                      payload: element,
                  })
                  console.log('comentario post pessoal',element)
                }),
                setCarregando(false)
                console.log('comentarios post pessoal',state.comentariosPostPessoal)
            })
            .catch((err) => {
              console.warn("ops! ocorreu um erro" + err);
              console.log('items',response.data);
              setCarregando(false)
            });

        AsyncStorage.getItem("TOKEN").then((token) => {
            setIdUsuarioLogado(token)

        })



    }, []);

    const salvarComentario = () => {
        
            api.post("comentariosPessoal/create", novoComentario)
            .then((response) => {                
                //comentarios.concat(response.data);
                dispatch({
                    
                    type: 'addComentarioPostPessoal',
                    payload: response.data,
                })
                let aux;
                aux = postPessoal
                postPessoal.comentariosPessoal += 1;
                setpostPessoal(aux);
                dispatch({
                    
                    type: 'updatePostPessoal',
                    payload: postPessoal,
                })

                console.log('Novo Comentarios', response.data);
                //console.log('todos comentarios do state', state.comentariosPostPessoal);
                setComentario("");
                Alert.alert('Sucesso!','Comentário adicionado'); 
            
        }, (error) => {
            console.warn('Erro', error);
        }
        )
  
    }

    function getActions(item) {
        return (
            <>
                <Button
                    onPress={() => navigation.navigate('editarComentario', 
                        {
                            "value": item,
                            "tela": "comentariopessoal"
                        }
                    )}
                    type="clear"
                    icon={<Icon name='edit' size={25} color="orange" />}
                />
                <Button
                    onPress={() => confirmComentarioDeletion(item)}
                    type="clear"
                    icon={<Icon name='delete' size={25} color="red" />}
                />
            </>
        )
    }

    function confirmComentarioDeletion(item){
        Alert.alert('Escluir comentário','Deseja escluir o comentário?',[
            {
                text: 'Sim',
                onPress(){
                     
                     api.delete(`deleteComentarioPessoal/${item.id}`)
                     .then((response) => {
                         setCarregando(false)
                         console.log('comentarios post pessoal',state.comentariosPostPessoal)

                         dispatch({
                            type: 'deleteComentarioPostPessoal',
                            payload: item,
                        });
                        let aux;
                        aux = postPessoal
                        postPessoal.comentariosPessoal -= 1;
                        setpostPessoal(aux);
                        dispatch({
                            
                            type: 'updatePostPessoal',
                            payload: postPessoal,
                        });
                        Alert.alert('Sucesso!','Comentário deletado');  
                     })
                     .catch((err) => {
                       console.warn("ops! ocorreu um erro" + err);
                       console.log('items',response.data)
                     });
                     	    
                       
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    const usuarioLogar = () => {    
            Alert.alert('Necessário logar','É necessário estar logado para comentar. Deseja efetuar o login ou criar uma conta?',
                [
                    {
                        text: 'Sim',
                        onPress(){
                            navigation.navigate('PerfilEntrar')
                        }                   
                    },
                    {
                        text: 'Não'
                    }
                ]
            )
    }

    const getComentarioItem = ({ item }) => {
        return (
            <View style={styles.containerMensagem}>
                <View>
                    {console.log('items no corpo',item.usuario)}
                    <ListItem bottomDivider key={item.id}>
                        <Avatar
                            source={{ uri: item.usuario.foto }}
                            avatarStyle={{ borderWidth: 1, border: '1px solid #0000', borderRadius: 10 }}
                            ContainerStyle={{ backgroundColor: 'blue' }}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 12 }}>{item.usuario.nome}</ListItem.Title>
                            <ListItem.Subtitle style={{ fontSize: 16 }}>{item.comentario}</ListItem.Subtitle>
                        </ListItem.Content>
                        {idUsuarioLogado == item.usuario.id ? getActions(item) : null

                        }
                    </ListItem>
                </View>
                <View style={styles.container}>

                    {/* <KeyboardAvoidingView style={{position: 'absolute', left: 0, right: 0, bottom: 0}} behavior="position">
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setComentario(text)}
                        // value={this.state.email}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'
                        />
                    <Button  title='SEND' />
                    </KeyboardAvoidingView> */}
                </View>

                {/*<RBSheet
                    
                    ref={ref => {
                    this.Input = ref;
                    
                    }}
                    height={60}
                    animationType="none"
                    openDuration={200}
                    customStyles={{
                    wrapper: { backgroundColor: "#fff" }
                    }}
                >
                    <View style={styles.inputContainer}>
                    <Icon name="photo-camera" style={styles.inputIcon} />
                    <Icon name="tag-faces" style={styles.inputIcon} />
                    <TextInput style={styles.input} autoFocus placeholder="Write a comment..." />
                    <Icon
                        name="send"
                        style={[styles.inputIcon, styles.inputIconSend]}
                        onPress={() => this.Input.close()}
                    />
                    </View>
                </RBSheet> */}
            </View>
        )
    }

    return (
        <View style={style.ContainerPadrao}>
            <View style={styles.containerMensagem}>
                {carregando &&
                    <ActivityIndicator color="#fff" size={25} />    
                }
                {!carregando &&
                <>
                <FlatList
                    keyExtractor={({id},index)=>id}
                    data={state.comentariosPostPessoal}
                    //renderItem={getUserItem}
                    renderItem={getComentarioItem}
                    extraData={state.comentariosPostPessoal}
                //<Text key={item._id}>{item.nome},{item.idade}</Text>

                />
                
                <View style={styles.inputContainer}>

                    <TextInput style={styles.input} placeholder="Comentar..."
                    onChangeText={(text) => setComentario(text)}>

                    </TextInput>
                    <Icon
                        name="send" color='white'
                        style={[styles.inputIcon, styles.inputIconSend]}
                        value={comentario}
                        onPress={() => {if(state.user.length > 0){ if (comentario.length <= 0) {
                                    Alert.alert('Erro','Náo possível adicionar comentario em branco')
                                }else{
                                    salvarComentario()
                                }
                            }else{
                                usuarioLogar();
                            }   
                    
                        }
                        
                        }
                    />
                </View>
                </>
                }
                
            </View>
        </View>
    )
}

export default ComentariosPostPessoal;
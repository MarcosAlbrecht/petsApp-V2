import React, {useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import style from '../../styles';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import styles from './styles';
import UsersContext from '../../context/StateContext';

// import { Container } from './styles';

const ComentariosPostAdocao = ({ route, navigation }) => {
    console.warn('comentarios', route)
    const [postAdocao, setpostAdocao] = useState(route.params ? route.params : {});
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
        postAdocao: {
            id: `${postAdocao.id}`
        },  
    }
    useEffect(() => {
        // api.get(`comentariosAdocao/${postAdocao.id}`)
        //     .then((response) => {
        //         setComentarios(response.data),
        //             console.warn('comentarios', response.data)
        //     })
        //     .catch((err) => {
        //         console.error("ops! ocorreu um erro" + err);
        //         console.log('items', response.data)
        //     });
        dispatch({
            type: 'cleanComentarioPostAdocao',
            //payload: element,
        })
        api.get(`comentariosAdocao/${postAdocao.id}`)
            .then((response) => {
                response.data.forEach(element => {
                    dispatch({
                        type: 'createComentarioPostAdocao',
                        payload: element,
                    })
                    console.log('comentario post pessoal', element)
                }),
                setCarregando(false)
                console.log('comentarios post pessoal', state.comentariosPostPessoal)
            })
            .catch((err) => {
                console.warn("ops! ocorreu um erro" + err);
                console.log('items', response.data);
                setCarregando(false)
            });

        AsyncStorage.getItem("TOKEN").then((token) => {
            setIdUsuarioLogado(token)

        })



    }, []);

    const salvarComentario = () => {
        
        api.post("comentariosAdocao/create", novoComentario)
            .then((response) => {
                dispatch({
                    
                    type: 'addComentarioPostAdocao',
                    payload: response.data,
                })
                console.warn('Novo Comentarios', response.data);
                Alert.alert('Sucesso!','Comentário adicionado');
                setComentario(''); 

            
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
                            "tela": "comentarioadocao"
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
    
    function confirmComentarioDeletion(item){
        Alert.alert('Escluir Comentário','Deseja escluir o comentario?',[
            {
                text: 'Sim',
                onPress(){
                     
                     api.delete(`deleteComentarioAdocao/${item.id}`)
                     .then((response) => {
                         setCarregando(false)
                         console.log('comentarios post adocao',state.comentariosPostAdocao)

                         dispatch({
                            type: 'deleteComentarioPostAdocao',
                            payload: item,
                        }),
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
    const getComentarioItem = ({ item }) => {
        return (
            <View style={styles.containerMensagem}>
                <View>
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
                        keyExtractor={({ id }, index) => id}
                        data={state.comentariosPostAdocao}
                        //renderItem={getUserItem}
                        renderItem={getComentarioItem}
                        extraData={state.comentariosPostAdocao}
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

export default ComentariosPostAdocao;
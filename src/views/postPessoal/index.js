import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import api from '../../services/api';
import UsersContext from '../../context/StateContext';
import RNFetchBlob from 'react-native-fetch-blob';
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import containerPadrao from '../../styles';
import styles from './styles';
import { BottomSheet, ListItem, Icon } from 'react-native-elements';

// import { Container } from './styles';

const postPessoal = ({ route, navigation }) => {
    const [postPessoal, setPostPessoal] = useState(route.params ? route.params : { usuario:{id:""} })
    const { state, dispatch } = useContext(UsersContext);
    const [isLoading, setLoading] = useState(false);
    const [isLoadingToken, setLoadingToken] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

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

    const deleteImagem = () => {
        //setLoadPicture({ fotos: [...loadPicture.fotos, 'https://images.ecycle.com.br/wp-content/uploads/2021/05/20195924/o-que-e-paisagem.jpg'] })
        cadastroPostAdocao.fotos.splice(imagemPressionada, 1);
        let auxFotos = cadastroPostAdocao;
        auxFotos.fotos.splice(imagemPressionada, 0);
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
        console.log('url da imagem', (image.path));
        //console.log('tamanho array', loadPicture.fotos.length);
        //setLoadPicture(loadPicture)
        RNFetchBlob.fs.readFile(image.path, 'base64')
            .then((data) => {
                // handle the data ..

                try {
                    console.log('antes da imagem', postPessoal)    
                    var dadosimagem = `data:${image.mime};base64,${data}`;
                    console.log('dados imagem', dadosimagem)
                    //setLoadPicture({ fotos: [...loadPicture.fotos, dadosimagem]})
                    //setLoadPicture({ fotos: [...loadPicture.fotos, dadosimagem] });
                    setPostPessoal({ ...postPessoal, foto: dadosimagem })
                    //let auxFotos = cadastroPostAdocao;
                    //auxFotos.fotos.push(dadosimagem);
                    //setcadastroPostAdocao(auxFotos);

                    //console.log(loadPicture.fotos.length);
                    //console.warn('loadpicture', loadPicture);
                    //cadastroPostAdocao.fotos.splice(cadastroPostAdocao.fotos.length-1, 0, cadastroPostAdocao.fotos.splice(cadastroPostAdocao.fotos.length,1)[0])
                    //setcadastroPostAdocao({...cadastroPostAdocao, [fotos]:[ loadPicture.fotos]})

                    console.log('apos a', postPessoal)
                    //cadastroPostAdocao.fotos.splice(0,1)  
                } catch (error) {
                    console.warn('erro', error)
                }
            })
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
        }
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
                    setPostPessoal({ ...postPessoal, usuario: { id: response.data.id } })
                    //setLoadPicture([...loadPicture.fotos, cadastroPostAdocao.fotos]})
                    //setLoadPicture(loadPicture => [...loadPicture, cadastroPostAdocao.fotos]);
                    console.log("login" + postPessoal);
                }

            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
                Alert.alert("Usuário não encontrado", "Ocorreu um erro ao logar!")
            });
    }

    useEffect(() => {
        if (state.user.length <= 0) {
            AsyncStorage.getItem("TOKEN").then((token) => {
                logarComToken(token)

            });
            console.log('entou no if do login', state.user)
        } else {
            console.log('nao entou no if do login com token', {postPessoal})
            console.log('id user no state', state.user[0]._id);
            //setPostPessoal({...postPessoal.usuario, usuario: { id: state.user[0]._id} })

            let auxUser = postPessoal;
            auxUser.usuario.id = state.user[0]._id;
            setPostPessoal(auxUser);
            console.log('nao entou no if do login com token', {postPessoal})
        }



    }, [])

    const salvarPostPessoal = () => {
        console.log('route params', route);
        console.log('valor editado do postadocao', postPessoal); 
        if (route.params != null) {
          console.log('esta editando - novo nome', postPessoal.descricao);
          console.log('id post pessoal', postPessoal.id);
          api.put("postpessoalupdate/"+postPessoal.id, postPessoal)
            .then((response) => {
              //console.warn('Mensagem', response);
              //console.warn('Mensagem', response.data);
              dispatch({
                type: 'updatePostPessoal',
                payload: response.data,
              });
              Alert.alert('Sucesso!', 'Post alterado com sucesso.');
              }, (error) => {
                console.warn('Erro', error);
              }
            )
          
    
        }else{
          //setcadastroPostAdocao({...cadastroPostAdocao.usuario, usuario: { id : idUser }})
          //postAdocao.fotos.splice(0,1)
          console.warn('cadastrando dados', postPessoal)
          api.post("postpessoal/create", postPessoal)
            .then((response) => {
              //console.warn('Mensagem', response);
              //console.warn('Mensagem', response.data);
              dispatch({
                type: 'createPostPessoal',
                payload: response.data,
              });
              Alert.alert('Sucesso!', 'Post cadastrado com sucesso.');
              }, (error) => {
                console.warn('Erro', error);
              }
            )
        }  
      }

    function renderImage(item) {
        return (
            <View>
                <TouchableOpacity onPress={() => {removerFoto(item)}}>
                    <Image
                        style={styles.productIamge}
                        source={{ uri: item.foto }}
                        
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const removerFoto = (item) => {
        Alert.alert('Remover','Deseja remover a foto?',[
            {
                text: 'Sim',
                onPress(){
                    //let auxUser = postPessoal;
                    //auxUser.foto = "";
                    //setPostPessoal(auxUser);
                    
                    setPostPessoal({ ...postPessoal, foto: "" })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    return (
        <View style={containerPadrao.ContainerPadrao}>
            {isLoading &&
                <ActivityIndicator color="#fff" size={25} />
            }

            {!isLoading &&
                <>
                    <Text style={styles.textGeral}>
                        Descrição
                    </Text>
                    {console.log('na tela', {postPessoal})}
                    <TextInput style={styles.textInputDescricao}
                        onChangeText={descricao => setPostPessoal({ ...postPessoal, descricao })}
                        autoCorrect={false}
                        numberOfLines={10}
                        multiline={true}
                        value={postPessoal.descricao}
                    >
                    </TextInput>
                    <TouchableOpacity onPress={() => { setIsVisible(true) }}>
                        <View style={styles.containerAddPhoto}>
                            <Icon name="photo-camera" size={30} />
                            <Text style={styles.textContainerAddPhoto}>Clique aqui para adicionar uma foto ou imagem</Text>
                        </View>
                    </TouchableOpacity>

                    {postPessoal.foto != null ? renderImage(postPessoal) : null}

                    <View style={styles.btnCard}>
                        <TouchableOpacity style={styles.btnSalvar} onPress={() => { salvarPostPessoal(), navigation.popToTop(), console.log('cadastro', postPessoal) }}>
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
                                <Icon name={l.icon} />
                                <ListItem.Content>
                                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </BottomSheet>
                </>
            }
        </View>
    );
}

export default postPessoal;
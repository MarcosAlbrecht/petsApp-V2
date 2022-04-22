import { getActionFromState } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import UsersContext from '../../context/StateContext';
import api from '../../services/api';
import style from './styles'
import FeatherIcon from 'react-native-vector-icons/Feather';
import containerPadrao from '../../styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({route, navigation}) => {
    //console.warn('props',props)
    const [postAdocao, setPostAdocao] = useState(route.params ? route.params : {});
    const [carregando, setCarregando] = useState(true);
    const {state, dispatch} = useContext(UsersContext);
    //const {state} = useContext(UsersContext);
    //console.warn('ctx', Object.keys(ctx.state))   
    useEffect(() => {
        api.get("postadocao")
          //.then((response) => {setPostAdocao(response.data), console.warn('dados',item.fotos[0])})
          .then((response) => {
              response.data.forEach(element => {
                dispatch({
                    type: 'createPostAdocao',
                    payload: element,
                })
              }),
              setCarregando(false)
          })
          .catch((err) => {
            console.warn("ops! ocorreu um erro" + err);
            console.log('items',response.data)
          });

          AsyncStorage.getItem("TOKEN").then((token) => {
            console.log('token', token)
            logarComToken(token)
            
          })
          .catch((err) => {
            console.warn("ops! ocorreu um erro com o toekn" + err);
            
          });
          
      }, []);

    const entrarComId = (id) => {
        api.get('loginId', { params: { idUser: id } })
            .then((response) => {
                //setLoading(false),
                    console.warn('Logou com sucesso entrou Com Id', response.data.id)
                AsyncStorage.setItem("TOKEN", response.data.id)
                //setModal(false);
                //setLoadingToken(false);
                //setIdUser(id);
                dispatch({
                    type: 'createUser',
                    payload: response.data,
                });
                console.warn('dados user no state', state.user);

            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
                Alert.alert("Usuário não encontrado", "Ocorreu um erro ao logar!")
            });
    }
      
    const logarComToken = (token) => {

        //setLoadingToken(true)
        let data = {
            token: token
        }

        if (token === null) {
            console.log('token nullo');
            //setModal(true);
        } else {
            console.log('token encontrado', token);
            console.log('user no state', state.user);
            if (state.user.length <= 0) {
                entrarComId(token)
                console.log('entrou no IF');
            }

            // setModal(false);
            // setLoadingToken(false)
            // setIdUser(token)
        }

        //props.navigation.navigate('adocaoPetCadastro');

    }

    function confirmUserDeletion(item){
        Alert.alert('Escluir Usuário','Deseja escluir o usuario?',[
            {
                text: 'Sim',
                onPress(){
                     dispatch({
                         type: 'deleteUser',
                         payload: item,
                     })   
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getActions(item){
        return(
            <>
                <Button
                    onPress={() => navigation.navigate('UserForm', item) }
                    type="clear"
                    icon={<Icon name='edit' size={25} color="orange"/>}
                />
                <Button
                    onPress={() => confirmUserDeletion(item) }
                    type="clear"
                    icon={<Icon name='delete' size={25} color="red"/>}
                />
            </>
        )
    }

    const getUserItem =({ item }) => {
        

        return (
            console.warn('fotos',item.fotos[0]),
            /*console.warn(item.fotos),
            <ListItem bottomDivider key={item.id} onPress={() => props.navigation.navigate('PostAdocaoDetalhado',item) }> 
                <Avatar source={ { uri: item.fotos[0] } } />
                <ListItem.Content>
                    <ListItem.Title>{ item.nome }</ListItem.Title>
                    <ListItem.Subtitle>{ item.descricao }</ListItem.Subtitle>
                </ListItem.Content> 
                {getActions(item)}              
            </ListItem>

            <View style={style.container}>
                <View style={style.productContainer}>    
                    <View style={style.product}>
                       
                        <Text style={style.productTile}>{item.nome}</Text>
                        <View style={style.idadeContainer}>
                        <View style={style.idade}>{ item.idade }</View>
                            <TouchableOpacity style={style.button} onPress={
                                () => props.navigation.navigate('PostAdocaoDetalhado',item)  } >
                                <Text>adicionar</Text>
                                <FeatherIcon size={30} name='plus-circle' color='#d1d7e9'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                
                </View>
            </View>*/
            
            <View style={style.container}>
               
                <View style={style.productContainer}>
                    <View style={style.product}>
                        <Image
                            style={style.productIamge}
                            source={{uri: item.fotos[0]}}
                        />        
                        <Text style={style.productTile}>{item.nome}</Text>
                        <Text style={style.productSubTitle}>{item.raca.raca}</Text>
                        <View style={style.idadeContainer}>
                            <Text style={style.idade}></Text>                                           
                        </View> 

                        <View style={style.buttonsContainer}>
                            <TouchableOpacity style={style.buttonComentarios} onPress={
                                () => navigation.navigate('comentariosPostAdocao',item)  }>
                                <Text style={style.buttonTextComentarios}>COMENTARIOS</Text>
                            </TouchableOpacity>    
                            <TouchableOpacity style={style.button} onPress={
                                () => navigation.navigate('PostAdocaoDetalhado',item)  }>
                                    <Text style={style.buttonText}>MAIS INFORMAÇÕES</Text>
                            </TouchableOpacity>
                        </View>           
                    </View>
                </View>
            </View>
        )
    }

    return(
        
                
       <View style={containerPadrao.ContainerPadrao}>
           {carregando &&
                <ActivityIndicator color="#fff" size={25} />    
            }
            {!carregando &&
                <>
                <FlatList
                    keyExtractor={({id},index)=>id}
                    data={state.postAdocao}
                    //renderItem={getUserItem}
                    renderItem={getUserItem}
                    extraData={state.postAdocao}    
                    //<Text key={item._id}>{item.nome},{item.idade}</Text>
                    
                />
                </>    
            }
        </View>
    )
}
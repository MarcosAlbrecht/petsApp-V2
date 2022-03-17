import { getActionFromState } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, Image } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import UsersContext from '../../context/StateContext';
import api from '../../services/api';
import style from './styles'
import FeatherIcon from 'react-native-vector-icons/Feather';
import containerPadrao from '../../styles';

export default props => {
    //console.warn('props',props)
    const [postAdocao, setPostAdocao] = useState();
   
    //const {state, dispatch} = useContext(UsersContext);
    const {state} = useContext(UsersContext);
    //console.warn('ctx', Object.keys(ctx.state))   
    useEffect(() => {
        api.get("postadocao")
          .then((response) => setPostAdocao(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            console.log('items',response.data)
          });
      }, []);


    

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
                    onPress={() => props.navigation.navigate('UserForm', item) }
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
            //console.warn('fotos',item.fotos[0]),
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
                                () => props.navigation.navigate('comentariosPostAdocao',item)  }>
                                <Text style={style.buttonTextComentarios}>COMENTARIOS</Text>
                            </TouchableOpacity>    
                            <TouchableOpacity style={style.button} onPress={
                                () => props.navigation.navigate('PostAdocaoDetalhado',item)  }>
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
            <FlatList
                keyExtractor={({id},index)=>id}
                data={postAdocao}
                //renderItem={getUserItem}
                renderItem={getUserItem}
                    
                  //<Text key={item._id}>{item.nome},{item.idade}</Text>
                
            />
        </View>
        
    )
}
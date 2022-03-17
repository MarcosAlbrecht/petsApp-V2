import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import style from '../../styles';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Container } from './styles';

const ComentariosPostAdocao = ({route, navigation}) => {
    console.warn('comentarios', route)
    const [postAdocao, setpostAdocao] = useState(route.params ? route.params : {});
    const [comentarios, setComentarios] = useState();
    const [idUsuarioLogado, setIdUsuarioLogado] = useState();

    useEffect(() => {
        api.get(`comentariosAdocao/${postAdocao.id}`)
          .then((response) => {setComentarios(response.data), console.warn('comentarios', response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            console.log('items',response.data)
          });

        AsyncStorage.getItem("TOKEN").then((token) => {
            setIdUsuarioLogado(token)
            
          })

      }, []);

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

    const getComentarioItem = ({ item }) => {
        return(
            
            <ListItem bottomDivider key={item.id }> 
                    <Avatar 
                        source={ { uri: item.usuario.foto }  } 
                        avatarStyle={{borderWidth: 1, border: '1px solid #0000', borderRadius: 10}} 
                        ContainerStyle={{backgroundColor: 'blue'}}
                        />
                    <ListItem.Content>
                        <ListItem.Title style={{fontSize: 12}}>{ item.usuario.nome }</ListItem.Title>
                        <ListItem.Subtitle style={{fontSize: 16}}>{ item.comentario }</ListItem.Subtitle>
                    </ListItem.Content> 
                     { idUsuarioLogado == item.usuario.id ? getActions(item) : null
                            
                     }              
            </ListItem>

            
        )
    }   

  return( 
    <View style={style.ContainerPadrao}>
        <FlatList
            keyExtractor={({id},index)=>id}
            data={comentarios}
            //renderItem={getUserItem}
            renderItem={getComentarioItem}
                        
            //<Text key={item._id}>{item.nome},{item.idade}</Text>
                    
                />    
    </View>
    )
}

export default ComentariosPostAdocao;
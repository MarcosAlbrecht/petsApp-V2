import React, {useContext, useEffect, useState} from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import containerPadrao from '../../styles';
import styles from './styles';
import { ListItem, Avatar, Icon, BottomSheet } from 'react-native-elements';
import UsersContext from '../../context/StateContext';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';

// import { Container } from './styles';

export default ({route, navigation}) => {
  const [postPessoal, setPostAdocao] = useState(route.params ? route.params : {});
  const [carregando, setCarregando] = useState(true);
  const {state, dispatch} = useContext(UsersContext);
  const [isVisible, setIsVisible] = useState(false);
  const [itemm, setItemm] = useState();
  const options = {
    headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json"
    }
 }

  const list = [
    {
      title: 'Deletar Post',
      onPress: () => {
        setIsVisible(false),
        console.log('pressionado botao de delete post pessoal'),
        deletePostPessoal(itemm)   
      },
      icon: 'delete',
      
    },
    {
      title: 'Editar Post',
      onPress: () => {
        setIsVisible(false),
        console.log('pressionado botao de galeria')
        //deleteImagem();
        navigation.navigate('postPessoal', itemm)
      },
      icon: 'edit'
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
    api.get("postpessoal", options)
      //.then((response) => {setPostAdocao(response.data), console.warn('dados',item.fotos[0])})
      .then((response) => {
          response.data.forEach(element => {
            dispatch({
                type: 'createPostPessoal',
                payload: element,
            })
          }),
          setCarregando(false);
          console.log('items',response.data)
      })
      .catch((err) => {
        console.warn("ops! ocorreu um erro" + err);
        console.log('items',status.postPessoal)
      });
  }, []); 

  function renderButtonMore(item){
    console.log('item'.item)
    if (state.user.length >= 0) {
     
      if (item.usuario.id == state.user[0]._id) {
        return(                
            <TouchableOpacity onPress={()=>{setIsVisible(true), setItemm(item)}}>
                <Feather name='more-horizontal' size={20}/> 
            </TouchableOpacity>      
        ); 
      } else {
        return null; 
      }
    }else {
      return null; 
    }
  }
  
  function deletePostPessoal(item) {
    Alert.alert('Escluir Post', 'Deseja excluir o post?', [
      {
        text: 'Sim',
        onPress() {
          api.delete(`deletePostPessoal/${item.id}`)
            .then((response) => {
              setCarregando(false)
              console.log('comentarios post pessoal', state.comentariosPostPessoal)
              setIsVisible(false),
                dispatch({
                  type: 'deletePostPessoal',
                  payload: item,
                }),
                Alert.alert('Sucesso!', 'Post deletado');
            })
            .catch((err) => {
              console.warn("ops! ocorreu um erro" + err);
              console.log('items', response.data)
            });
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  const CardHeader = ({ item }) => {
    return(
      <View style={styles.containerHead}>
        <View style={{flexDirection: 'row'}}>
          <Avatar
            source={{ uri: item.usuario.foto }}
            avatarStyle={{ borderRadius: 50 }}
            ContainerStyle={{ backgroundColor: 'blue' }}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textNameProfile}>{item.usuario.nome}</Text>    
            <Text style={{fontSize: 12}}>há 5 minutos</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginRight: 10}}>        
          {state.user.length > 0 ? renderButtonMore(item) : null}
        </View>
      </View>
    );
  };

  const RenderPosts = ({item}) => {
    return(
      <View style={styles.containerRenderPosts}>
        <CardHeader item={item}/>
        <View style={{marginTop: 10}}>
          <Text style={{fontWeight: '500'}}>{item.descricao}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Image
            style={styles.productIamge}
            source={{ uri: item.foto }}
          /> 
        </View>

        <View
          style={{
            marginTop: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '30%',
            alignItems: 'center',
            marginBottom: 15,
          }}>
            <View style={{
              marginTop: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '30%',
              alignItems: 'center',
              
            }}>
              
              <FontAwesome
                name="thumbs-up"
                size={20}
                color='blue'
              /> 
              
              <Text> {item.likes}</Text>
              </View>   
              <View style={{
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '20%',
                alignItems: 'center',
              }}>
                <FontAwesome
                  name="comment"
                  size={20}
                  color='blue'
                /> 
              <Text> {item.comentariosPessoal}</Text>
          </View>
          
            

        </View>

        <View style={{
          marginTop: 15,         
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginTop: 'auto',
          borderTopColor: 'black',
          borderTopWidth: 1,
          paddingTop: 10,
          //paddingTop: 35,

        }}>
          <View style={{
              marginTop: 10,
              alignItems: 'flex-start',
              flexDirection: 'row',
             
              
              
            }}>
              
              <FontAwesome
                  name="thumbs-o-up"
                  size={20}
                  color='black'
                />
              <TouchableOpacity>      
              <Text>  Curtir</Text>
              </TouchableOpacity> 
            </View>  
               
            <View style={{
              marginTop: 10,
              alignItems: 'flex-end',
              flexDirection: 'row',
              
              
              
            }}> 
              
              <FontAwesome
                  name="comment-o"
                  size={20}
                  color='black'
                /> 
              <TouchableOpacity onPress={
                () => navigation.navigate('comentariosPostPessoal',item)  }>     
              <Text>  Comentar</Text>
              </TouchableOpacity>
            </View>    
              
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
  )};
 

  return (
    <FlatList
      keyExtractor={({ id }, index) => id}
      data={state.postPessoal}
      //renderItem={getUserItem}
      renderItem={RenderPosts}
      extraData={state.postPessoal}
    //<Text key={item._id}>{item.nome},{item.idade}</Text>

    />
  )
}

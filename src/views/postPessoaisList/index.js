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
  const [liked, setLiked] = useState(false);
  const [userLogado, setUserLogado] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false)
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

  
  const verificarLike = function(item) {
      for (let index = 0; index < item.length; index++) {
        const element = item[index];
        
        if (element === state.user[0]._id) {
          return true;
        }else
          return false;
      }
      //console.log('VALOR ',item)
      
    
  } 

  useEffect(() => {
    api.get("postpessoal", options)
      //.then((response) => {setPostAdocao(response.data), console.warn('dados',item.fotos[0])})
      .then((response) => {
          response.data.forEach(element => {
            if (state.user.length > 0) {
              console.log('executando funcao verificalike',verificarLike(element.likes))
              if (verificarLike(element.likes)){
                //console.log('entrou no if dos likes ',element.likes.length)
                element.liked = true
              }
            }
            
            dispatch({
                type: 'createPostPessoal',
                payload: element,
            });
            console.log('likeds? ',element.likes)
          }),
          setCarregando(false);
          //console.log('items',response.data)
          
      })
      .catch((err) => {
        console.warn("ops! ocorreu um erro eao carregar postPessoal" + err);
        //console.log('items',status.postPessoal)
      });

      

      if (state.user.length > 0) {
        
        setUserLogado(state.user[0]._id);
        console.log('ususario logado',  userLogado)
      }else console.log('ususario nao logado')
  }, []); 

  function renderButtonMore(item){
    //console.log('item'.item)
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
              //console.log('comentarios post pessoal', state.comentariosPostPessoal)
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
        text: 'N??o'
      }
    ])
  }

  const onRefresh = () => {
    //set isRefreshing to true
    
    setIsRefreshing(true);
    
    dispatch({
        type: 'limparStatePessoal'    
    });
    api.get("postpessoal", options)
      //.then((response) => {setPostAdocao(response.data), console.warn('dados',item.fotos[0])})
      .then((response) => {
          response.data.forEach(element => {
            console.log('tamanho refresh',response.data.length)
            if (state.user.length > 0) {
              console.log('executando funcao verificalike',verificarLike(element.likes))
              if (verificarLike(element.likes)){
                //console.log('entrou no if dos likes ',element.likes.length)
                element.liked = true
              }
            }
            
            dispatch({
                type: 'createPostPessoal',
                payload: element,
            });
            console.log('likeds? ',element.likes)
          }),
          setCarregando(false);
          //console.log('items',response.data)
          
      })
      .catch((err) => {
        console.warn("ops! ocorreu um erro ao atualizar postPessoal" + err);
        //console.log('items',status.postPessoal)
      });

    setIsRefreshing(false);
}

  function Like(item){
    //verifica usuario esta logado para registrar o like
    if (state.user.length > 0) {  
      if (item.liked) {
        api.put('postpessoalupdate/likeremove/'+item.id+'/'+userLogado)
        .then((response) => {
          console.log('like adicionado no banco', response.data);
          dispatch({
            type: 'updatePostPessoal',
            payload: response.data,
          })
        })
        .catch((err) => {
          console.warn('Ocorreu um erro ao adicionar o like', err)
        })
      
      }else{

        api.put('postpessoalupdate/likeadd/'+item.id+'/'+userLogado)
        .then((response) => {
          console.log('like adicionado no banco', response.data);
          dispatch({
            type: 'updatePostPessoal',
            payload: response.data,
          })
        })
        .catch((err) => {
          console.warn('Ocorreu um erro ao adicionar o like', err)
        })
      }
    }else{
      Alert.alert('Efetuar Login','?? necess??rio logar para curtir o post!')
    }
  }

  function verificaLike(item){
    if (liked) {
      //removeLike(item);
    }else{
      //addLike(item)
    }
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
            <Text style={{fontSize: 12}}>h?? 5 minutos</Text>
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
              
              <Text> {item.likes != null ? item.likes.length : 0}</Text>
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
              {console.log('curtido>=???',item.liked )}
              <FontAwesome
                  name="thumbs-o-up"
                  size={20}
                  color={item.liked ? 'blue' : 'black' }
                />
              <TouchableOpacity onPress={() => Like(item)}>      
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
    //console.log('items pessoais', state.postPessoal[0]),
    <FlatList
      keyExtractor={({ id }, index) => id}
      data={state.postPessoal}
      //renderItem={getUserItem}
      renderItem={RenderPosts}
      extraData={state.postPessoal}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    //<Text key={item._id}>{item.nome},{item.idade}</Text>

    />
  )
}

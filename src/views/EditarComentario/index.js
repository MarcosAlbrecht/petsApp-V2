import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import UsersContext from '../../context/StateContext';
import styles from './styles';
import containerPadrao from '../../styles';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';

// import { Container } from './styles';

const editarComentario = ({ route, navigation }) => {
    const [comentarios, setComentarios] = useState(route.params ? route.params : {});  
    const {state, dispatch} = useContext(UsersContext);
    
    const salvarComentario = () => {
        api.put("comentariopessoalupdate/", comentarios)
        .then((response) => {                
            //comentarios.concat(response.data);
            dispatch({                
                type: 'updateComentarioPostPessoal',
                payload: response.data,
            })
            console.log('update Comentarios', response.data);
            
            //Alert.alert('Sucesso!','Comentário alterado'); 
            
        }, (error) => {
            console.warn('Erro', error);
            Alert.alert('Erro!','Ocorreu um erro ao editar o comentário'); 
        })
    }

  return (
        <View style={containerPadrao.ContainerPadrao}>
            <View style={styles.ContainerInput}>
                <TextInput style={styles.textInput}
                onChangeText={comentario => setComentarios({...comentarios, comentario})}
                value={comentarios.comentario}>
                </TextInput>
            </View>
            <View style={styles.ContainerButtons}>
                <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
                    <Text style={styles.textButtons}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSalvar} onPress={() => {salvarComentario(), navigation.goBack();}}>
                <Text style={styles.textButtons}>Salvar</Text>    
                </TouchableOpacity>
            </View>

        </View>
  );
}

export default editarComentario;
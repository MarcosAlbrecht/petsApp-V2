import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import style from '../../styles';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import styles from './styles';

// import { Container } from './styles';

const ComentariosPostAdocao = ({ route, navigation }) => {
    console.warn('comentarios', route)
    const [postAdocao, setpostAdocao] = useState(route.params ? route.params : {});
    const [comentarios, setComentarios] = useState();
    const [idUsuarioLogado, setIdUsuarioLogado] = useState();
    const [comentario, setComentario] = useState();


    useEffect(() => {
        api.get(`comentariosAdocao/${postAdocao.id}`)
            .then((response) => { setComentarios(response.data), console.warn('comentarios', response.data) })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
                console.log('items', response.data)
            });

        AsyncStorage.getItem("TOKEN").then((token) => {
            setIdUsuarioLogado(token)

        })



    }, []);

    function getActions(item) {
        return (
            <>
                <Button
                    onPress={() => navigation.navigate('UserForm', item)}
                    type="clear"
                    icon={<Icon name='edit' size={25} color="orange" />}
                />
                <Button
                    onPress={() => confirmUserDeletion(item)}
                    type="clear"
                    icon={<Icon name='delete' size={25} color="red" />}
                />
            </>
        )
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
                
                    <FlatList
                        keyExtractor={({ id }, index) => id}
                        data={comentarios}
                        //renderItem={getUserItem}
                        renderItem={getComentarioItem}

                    //<Text key={item._id}>{item.nome},{item.idade}</Text>

                    />              
                <View style={styles.inputContainer}>
                    
                    <TextInput style={styles.input} placeholder="Comentar..." />
                    <Icon
                        name="send" color='white'
                        style={[styles.inputIcon, styles.inputIconSend]}
                        
                    />
                    </View>
            </View>
        </View>
    )
}

export default ComentariosPostAdocao;
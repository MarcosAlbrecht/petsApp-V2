import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import UsersContext from '../../../context/StateContext';
import api from '../../../services/api';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import IconFeather from 'react-native-vector-icons/Feather';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';

// import { Container } from './styles';

const Logado = ({ route, navigation }) => {
    const { state, dispatch } = useContext(UsersContext);
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        if (state.user.length <= 0) {
            navigation.navigate('PerfilEntrar', {
                "value": "",
                "editanto": false
            })
        }

    }, [])

    const logOut = (item) => {
        Alert.alert('Deslogar', 'Deseja deslogar do APP?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: item,
                    });
                    AsyncStorage.removeItem("TOKEN").then((token) => {
                        navigation.navigate('PerfilEntrar');
                    });
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    const renderPerfil = ({ item }) => {
        return (
            <View style={styles.container}>

                {console.log('state user logado', { item })}
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Image
                        style={styles.productIamge}
                        source={{ uri: item.foto }}
                    />



                    <View style={{ alignItems: 'center', marginTop: 10 }}>

                        <Text style={styles.text}>{item.email}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>

                        <Text style={styles.buttonTextComentarios}>VISUALIZAR MAIS INFORMAÇÕES</Text>

                        <TouchableOpacity style={styles.button} onPress={
                            () => navigation.navigate('PerfilCadastrar', {
                                "value": item,
                                "editando": true
                            }
                            )}>
                            <IconFeather name='edit' color='black' size={18}></IconFeather>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 10, width: '30%' }}>

                        <TouchableOpacity style={styles.btnSair} onPress={() => logOut(item)}>
                            <View style={styles.botao}>
                                <IconFeather name='log-out' color='black' size={18}></IconFeather>
                                <Text style={styles.text}>SAIR</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }



    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <LinearGradient colors={['#f2fffe', '#00e7f3', '#00dcf7', '#00b7ff']} style={styles.linearGradient}>
                {isLoading &&
                    <ActivityIndicator color="#fff" size={25} />
                }
                {!isLoading &&
                    <>
                        <FlatList
                            keyExtractor={({ id }, index) => id}
                            data={state.user}
                            //renderItem={getUserItem}
                            renderItem={renderPerfil}
                            extraData={state.user}
                        //<Text key={item._id}>{item.nome},{item.idade}</Text>

                        />
                    </>

                }
            </LinearGradient>
        </View>
    );
}

export default Logado;
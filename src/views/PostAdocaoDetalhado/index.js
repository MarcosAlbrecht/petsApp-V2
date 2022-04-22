import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import UsersContext from '../../context/StateContext';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import style from './styles';
import { SliderBox } from "react-native-image-slider-box";
import containerPadrao from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ route, navigation }) => {
    //console.warn('adocao', route)
    const [pet, setpostAdocao] = useState(route.params ? route.params : {});
    const [userLogado, setUserLogado] = useState(false);
    const {state, dispatch} = useContext(UsersContext);
    const [isLoading, setLoading] = useState(true);
    //const {dispatch} = useContext(UsersContext)

    const clickHandler = () => {
        alert('Botão Clicado');
        console.log('dados pet', pet);
        navigation.navigate("adocaoPetCadastro", pet);
    };

    useEffect(() => {
        
        if (state.user.length > 0) {
            console.log('pet.usuario', pet.usuario.id);
            console.log('state.usuario', state.user[0]._id);
            
            if (pet.usuario.id == state.user[0]._id) {
                console.log('entrou no if if do botao', state.user[0]._id);
                setUserLogado(true);
                setLoading(false);      
        }
          
        }    
    }, [])

    return (
        <View style={containerPadrao.ContainerPadrao}>
            <View style={style.container}>
                <ScrollView>
                    <View style={style.petCarouselContainer}>
                        <SliderBox images={pet.fotos}
                            sliderBoxHeight={200}
                            dotColor="#FFEE58"
                            circleLoop
                            ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 5 }}
                        />

                    </View>
                    <View style={style.petInfosContainer}>
                        <View style={style.petNomeContainer}>
                            <Text style={style.tituloText}>Nome</Text>
                            <Text style={style.descricaoText}>{pet.nome}</Text>
                        </View>
                        <View style={style.petNomeContainer}>
                            <Text style={style.tituloText}>Descrição</Text>
                            <Text style={style.descricaoText}>{pet.descricao}</Text>
                        </View>
                        <View style={style.petDados1Container}>
                            <View style={style.petDados1SubContainer}>
                                <Text style={style.tituloText}>Raça</Text>
                                <Text style={style.descricaoText}>{pet.raca.raca}</Text>
                            </View>
                            <View style={style.petDados1SubContainer}>
                                <Text style={style.tituloText}>Idade</Text>
                                <Text style={style.descricaoText}>{pet.idade_pet}</Text>
                            </View>
                        </View>
                        <View style={style.petDados1Container}>
                            <View style={style.petDados1SubContainer}>
                                <Text style={style.tituloText}>Porte</Text>
                                <Text style={style.descricaoText}>{pet.porte}</Text>
                            </View>
                            <View style={style.petDados1SubContainer}>
                                <Text style={style.tituloText}>Pelagem</Text>
                                <Text style={style.descricaoText}>{pet.pelagem}</Text>
                            </View>
                        </View>

                        <View style={style.userContainerTopDivider}>
                            <Text style={style.userContainerTextInfos}> INFORMAÇÕES PARA CONTATO</Text>
                        </View>

                        <View style={style.userContainer}>


                            <View style={style.userContainerAvatar}>
                                <Avatar
                                    source={{ uri: pet.usuario.foto }}
                                    avatarStyle={{ borderWidth: 1, border: '1px solid #0000', borderRadius: 10 }}
                                    ContainerStyle={{ backgroundColor: 'blue' }}
                                />
                            </View>
                            <View style={style.userContainerInfos}>

                                
                                <Text style={style.tituloText}>{pet.usuario.nome}</Text>
                                                           
                                {/* {idUsuarioLogado == item.usuario.id ? getActions(pet) : null

                                } */}
                            </View>
                            <View style={style.userContainerInfos}>
                                <Text style={style.tituloText}>Telefone</Text>
                                <Text style={style.tituloText}>{`(${pet.usuario.ddd}) ${pet.usuario.telefone}`}</Text>
                            </View>
                           
                            

                        </View>
                        {!isLoading &&
                        <>
                            {userLogado &&
                                <>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={clickHandler}
                                    style={style.touchableOpacityStyle}>
                                    
                                    <Icon name="edit" size={30} color="white" style={style.floatingButtonStyle}/>
                                </TouchableOpacity> 
                                </> 
                            }
                        </> 
                        }
                    </View>

                   

                </ScrollView>
            </View>
        </View>

    )

}
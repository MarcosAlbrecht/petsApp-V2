import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, ScrollView } from 'react-native';
import UsersContext from '../../context/StateContext';
import style from './styles';
import { SliderBox } from "react-native-image-slider-box";
import containerPadrao from '../../styles';

export default ({route, navigation}) => {
    console.warn('adocao',route)
    const [pet, setpostAdocao] = useState(route.params ? route.params : {})
    //const {dispatch} = useContext(UsersContext)
    return(
        <View style={containerPadrao.ContainerPadrao}>
            <View style={style.container}>
                <ScrollView>
                <View style={style.petCarouselContainer}>
                    <SliderBox images={pet.fotos}
                    sliderBoxHeight={200} 
                    dotColor="#FFEE58"
                    circleLoop
                    ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
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
                    
                </View> 
                
            
                </ScrollView>     
            </View> 
        </View>
          
    )

}
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import UsersContext from '../../context/StateContext';
import { Picker } from "@react-native-picker/picker";

// import { Container } from './styles';

const Filtro = ({ route, navigation }) => {
    const [filtro, setFiltro] = useState(route.params ? route.params : {porte:""});
    const {state, dispatch} = useContext(UsersContext);
    const [porte, setPorte] = useState(['Porte','Pequeno', 'Médio', 'Grande','Gigante']);
    const [nomePorte, setNomePorte] = useState();
    const limpar = () => {
        setFiltro({...filtro, porte: 0})  
    }

    function aplicarFiltro() {
        let aux = state.postAdocao;
        if (filtro.porte != null) {
            console.log('Filtro aplicado porte', state.postAdocao.length); 
            console.log('Filtro aplicado porte nome', filtro.porte);
            aux = aux.filter(data => data.porte == filtro.porte);
            console.log('Filtro aplicado porte', aux.length);   
        }
        else if (filtro.ddd != null) {
            console.log('Filtro DDD', state.postAdocao[0].ddd); 
            aux = aux.filter(data => data.usuario.ddd == filtro.ddd);
            console.log('Filtro DDD aplicado', aux);    
            
        }
        dispatch({
            type: 'limparStateAdocao',
            payload: aux,
        });
        
        dispatch({
            type: 'aplicaFiltroAdocao',
            payload: aux,
        });
        navigation.goBack();
        console.log('tamanho state adocao apos filtro',state.postAdocao.length);
    }   
    return (    

            <View style={styles.container}>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="DDD"
                        placeholderTextColor="#003f5c"
                        onChangeText={ddd => setFiltro({...filtro, ddd})}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Senha"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={password => setFiltro({...filtro, password})}
                    />
                </View>
                {console.log(filtro)}
                <Picker style={styles.textInput} selectedValue={filtro.porte}
                    onValueChange={(porte, itemIndex) => setFiltro({...filtro, porte})}>
                    {
                        porte.map((cr, key) => {
                        return <Picker.Item label={cr} value={cr} />
                        })
                    }

                </Picker>



                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Text style={styles.forgot_button}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn} onPress={() => limpar()} >
                    <Text style={styles.loginText}>Limpar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => aplicarFiltro()} >
                    <Text style={styles.loginText}>Aplicar</Text>
                </TouchableOpacity>

            </View>
        
    );
}

export default Filtro;
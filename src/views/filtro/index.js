import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import UsersContext from '../../context/StateContext';
import { Picker } from "@react-native-picker/picker";

// import { Container } from './styles';

const Filtro = ({ route, navigation }) => {
    const [filtro, setFiltro] = useState(route.params ? route.params : {porte:0});
    const {state, dispatch} = useContext(UsersContext);
    const [porte1, setPorte1] = useState(['Porte','Pequeno', 'Médio', 'Grande','Gigante']);
    const [nomePorte, setNomePorte] = useState();
    const limpar = () => {
        setFiltro({...filtro, porte: 0})  
    }

    function aplicarFiltro() {
        let aux = state.postAdocao;
        if (filtro.porte > 0) {
            console.log('Filtro aplicado', state.postAdocao[0].porte); 
            aux = aux.filter(data => data.porte == nomePorte);
            console.log('Filtro aplicado', aux);   
        }
        if (filtro.ddd != null) {
            console.log('Filtro DDD', state.postAdocao[0].ddd); 
            aux = aux.filter(data => data.usuario.ddd == filtro.ddd);
            console.log('Filtro DDD aplicado', aux);    
            
        }
         
        dispatch({
            type: 'aplicaFiltroAdocao',
            payload: aux,
        });
        navigation.goBack();
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
                    onValueChange={(porteName, porte) => setFiltro({...filtro, porte})}
                    placeholder="Porte"
                    >
                    {
                        //console.log('selecionado', filtro.porte),
                        porte1.filter((value, index) => filtro.porte === 0 ? value : index === 0 ? false : true)
                        .map((cr, key) => {
                        return <Picker.Item label={cr} value={key} />
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
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import UsersContext from '../../../context/StateContext';
import api from '../../../services/api';
import styles from './styles';

// import { Container } from './styles';

const Logado = ({ route, navigation }) => {
    const { state, dispatch } = useContext(UsersContext);
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        if (state.user.length <= 0) {
            navigation.navigate('PerfilEntrar')
        }

    }, [])

    const renderPerfil = ({item}) => {
        return(
            <View style={styles.container}>
                {console.log('state user logado', {item})}
                <Text>Logado</Text>
                <Image
                    style={styles.productIamge}
                    source={{uri: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'}}
                /> 
                <Text>Foto</Text>
            </View>
        )
    }

    return (
        <View>
            {isLoading &&
                <ActivityIndicator color="#fff" size={25} />
            }
            {!isLoading &&
                <>
                    <FlatList
                        keyExtractor={({id},index)=>id}
                        data={state.user}
                        //renderItem={getUserItem}
                        renderItem={renderPerfil}
                        extraData={state.user}    
                        //<Text key={item._id}>{item.nome},{item.idade}</Text>
                        
                    />
                </> 
                
            }
             
        </View>  
    );
}

export default Logado;
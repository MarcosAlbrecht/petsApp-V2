import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import UserList from './views/UserList/index';
import UserForm from './views/UserForm/UserForm';
import PostAdocaoDetalhado from './views/PostAdocaoDetalhado/index'
import { Button, Icon } from 'react-native-elements';
import { UsersProvider } from './context/StateContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFeather from 'react-native-vector-icons/Feather';
import Authenticate from './views/Authenticate/'
import adocaoPetCadastro from './views/adocaoPetCadastro';
import comentariosPostAdocao from './views/ComentariosPostAdocao';
import postPessoaisLista from './views/postPessoaisList';
import comentariosPostPessoal from './views/ComentariosPostPessoal';
import editarComentario from './views/EditarComentario';
import postPessoal from './views/postPessoal';
import PerfilLogado from './views/Perfil/Logado';
import PerfilEntrar from './views/Perfil/Entrar';
import PerfilCadastrar from './views/Perfil/Cadastrar';

//const Stack = createStackNavigator();
const StackAdocao = createStackNavigator();

const Tab = createBottomTabNavigator();


function AdocaoTabStack(){
    return(
        <StackAdocao.Navigator screenOptions={screenOptions}>
        
            <StackAdocao.Screen 
                name="Adoção" 
                component={UserList}
                options={({navigation}) => {
                return{
                    title:"Adocão",
                    headerRight: () => (
                        <View style={{flexDirection: 'row'}}>
                        <Button
                            onPress={() => {}} 
                            type='clear'
                            icon={<IconFeather name="filter" size={25} color="white"/>}
                        />
                        <Button
                            onPress={() => navigation.navigate("adocaoPetCadastro")} 
                            type='clear'
                            icon={<IconFeather name="plus" size={25} color="white"/>}
                        />
                        </View>
                    )
                }
            }} 
            />
            <StackAdocao.Screen 
                name='PostAdocaoDetalhado'
                component={PostAdocaoDetalhado}
                options={{
                    title: "Detalhes"
                }}
            />
            <StackAdocao.Screen 
                name='Authenticate'
                component={Authenticate}
                options={{
                    title: "Login"
                }}
            />
            <StackAdocao.Screen 
                name='adocaoPetCadastro'
                component={adocaoPetCadastro}
                options={{
                    title: "Cadastro/Edição Post Adoção"
                }}
            />
            <StackAdocao.Screen 
                name='comentariosPostAdocao'
                component={comentariosPostAdocao}
                options={{
                    title: "Comentários"
                }}
            />
            <StackAdocao.Screen 
                name='editarComentario'
                component={editarComentario}
                options={{
                    title: "Editar Comentário"
                }}
            /> 
            

            
        </StackAdocao.Navigator>
    )
}

function BlogTabStack(){
    return(
        <StackAdocao.Navigator screenOptions={screenOptions}>
            <StackAdocao.Screen 
                name='postPessoaisLista'
                component={postPessoaisLista}
                options={({navigation}) => {
                    return{
                        title:"Posts",
                        headerRight: () => (
                            <View style={{flexDirection: 'row'}}>
                            <Button
                                onPress={() => {}} 
                                type='clear'
                                icon={<IconFeather name="filter" size={25} color="white"/>}
                            />
                            <Button
                                onPress={() => navigation.navigate("postPessoal")} 
                                type='clear'
                                icon={<IconFeather name="plus" size={25} color="white"/>}
                            />
                            </View>
                        )
                    }
                }} 
            /> 
            <StackAdocao.Screen 
                name='comentariosPostPessoal'
                component={comentariosPostPessoal}
                options={{
                    title: "Comentários"
                }}
            />  
            <StackAdocao.Screen 
                name='editarComentario'
                component={editarComentario}
                options={{
                    title: "Editar Comentário"
                }}
            /> 
            <StackAdocao.Screen 
                name='postPessoal'
                component={postPessoal}
                options={{
                    title: "Cadastro/Edição Post Pessoal"
                }}
            />   
        </StackAdocao.Navigator>
    )
}

function PerfilTabStack(){
    
    return(


        <StackAdocao.Navigator screenOptions={screenOptions}>

            <StackAdocao.Screen 
                name='PerfilLogado'
                component={PerfilLogado}
                options={{
                    title: "Perfil"
                }}
            />  
            <StackAdocao.Screen 
                name='PerfilEntrar'
                component={PerfilEntrar}
                options={{
                    title: "Entrar"              
                }}
            />  
            <StackAdocao.Screen 
                name='PerfilCadastrar'
                component={PerfilCadastrar}
                options={{
                    title: "Cadastrar"
                }}
            />  
            
            
        </StackAdocao.Navigator>
    )
}

function MyTabs(){
    return(   
        <Tab.Navigator screenOptions={screenOptionsBottonTabs}>
            <Tab.Screen name='Adocão' component={AdocaoTabStack} options={{tabBarIcon:({color, size}) => (<IconFeather name="github" size={25} color='#f4511e'/>)   }}  /> 
            <Tab.Screen name='Blog' component={BlogTabStack} options={{  tabBarIcon:({color, size}) => (<IconFeather name="smile" size={25} color='#f4511e'/>)  }} /> 
            <Tab.Screen name='Perfil' component={PerfilTabStack} options={{  tabBarIcon:({color, size}) => (<IconFeather name="user" size={25} color='#f4511e'/>)  }}/>   
        </Tab.Navigator>
        
    )
}

export default props => {
    return(
        

        /*<UsersProvider>      
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName='UserList'
                    screenOptions={screenOptions}
                    >
                    <Tab.Screen 
                        name='UserList'
                        component={UserList}
                        options={({navigation}) => {
                            return{
                                title:"Lista de Usuários",
                                headerRight: () => (
                                    <Button
                                        onPress={() => navigation.navigate("UserForm")} 
                                        type='clear'
                                        icon={<Icon name="add" size={25} color="white"/>}
                                    />
                                )
                            }
                        }} 
                    />
                    <Tab.Screen 
                        name='UserForm'
                        component={UserForm}
                        options={{
                            title: "Formulário de Uusário"
                        }}
                    />
                    <Tab.Screen 
                        name='Perfil'
                        component={() => {}}
                        options={{
                            title: "Formulário de Uusário"
                        }}
                    />
                </Tab.Navigator>

            </NavigationContainer>      
        </UsersProvider>*/

        <UsersProvider>
            <NavigationContainer>
                <MyTabs />
            </NavigationContainer>
        </UsersProvider>
    )
}

const screenOptions = {
    headerStyle:{
        backgroundColor: '#f4511e'
        
    },
    headerTintColor: '#fff', 
    headerTitleStyle: {
        fontWeight: 'bold',
    },  
}

const screenOptionsBottonTabs = {
    headerShown: false,
    tabBarLabelStyle: {
        fontSize: 15,
       
    },
    
      
}
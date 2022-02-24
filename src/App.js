import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import UserList from './views/UserList/index';
import UserForm from './views/UserForm/UserForm';
import PostAdocaoDetalhado from './views/PostAdocaoDetalhado/index'
import { Button, Icon } from 'react-native-elements';
import { UsersProvider } from './context/UsersContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFeather from 'react-native-vector-icons/Feather';
import Authenticate from './views/Authenticate/'

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
                        <Button
                            onPress={() => navigation.navigate("Authenticate")} 
                            type='clear'
                            icon={<Icon name="add" size={25} color="white"/>}
                        />
                    )
                }
            }} 
            />
            <StackAdocao.Screen 
                        name='Authenticate'
                        component={Authenticate}
                        options={{
                            title: "Login"
                        }}
                    />

            
        </StackAdocao.Navigator>
    )
}

function BlogTabStack(){
    return(
        <View>
            <Text>Experiencia Scream</Text>
        </View>
    )
}

function PerfilTabStack(){
    return(
        <View>
            <Text>Perfil Scream</Text>
        </View>
    )
}

function MyTabs(){
    return(   
        <Tab.Navigator screenOptions={screenOptionsBottonTabs}>
            <Tab.Screen name='Adocão' component={AdocaoTabStack} options={{  tabBarIcon:({color, size}) => (<IconFeather name="github" size={25} color='#f4511e'/>)  }}  /> 
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
}
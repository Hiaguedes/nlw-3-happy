import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const {Navigator,Screen} = createStackNavigator();
import OrphanagesMap from '../src/pages/OrphanagesMap';
import OrphanageData from '../src/pages/createOrphanage/OrphanageData';
import OrphanageDetails from '../src/pages/createOrphanage/OrphanageDetails';
import SelectMapPosition from '../src/pages/createOrphanage/SelectMapPosition';
import Header from './components/Header';

export default function Routes(){
    return (
        <NavigationContainer>
        <Navigator screenOptions={{headerShown: false, cardStyle:{backgroundColor: '#f2f3f5'}}}>
            <Screen name="OrphanagesMap" component={OrphanagesMap} 
           />

            <Screen name="OrphanageData" component={OrphanageData} options={{
                headerShown: true,
                header: ()=> <Header title="Informe os Dados do Orfanato"/>
            }} />

            <Screen name="OrphanageDetails" component={OrphanageDetails} 
                options={{
                headerShown: true,
                header: ()=> <Header title="Informações do Orfanato" showCancel={false}/>
            }}/>

            <Screen name="SelectMapPosition" component={SelectMapPosition}
            options={{
                headerShown: true,
                header: ()=> <Header title="Selecione Orfanato no Mapa"/>
            }}/>
            </Navigator>
        </NavigationContainer>
    )
}
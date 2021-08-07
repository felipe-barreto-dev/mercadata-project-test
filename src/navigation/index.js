import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {MusicList, MusicPlayer} from '../screens'

import { MaterialIcons } from '@expo/vector-icons';

export default function Navigation() {

    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator
        
        screenOptions={{
            tabBarLabelStyle: { display:"none" },
            tabBarStyle: { backgroundColor: '#222' },
            tabBarIndicatorStyle: { backgroundColor: "#ffbf00"}
        }} 
        tabBarPosition="bottom" >
            <Tab.Screen name="MusicList" component={MusicList}
            options={{
                tabBarIcon: () => {
                    return <MaterialIcons name="queue-music" size={24} color="#ffbf00" />
                },
                
            }} />
            <Tab.Screen name="MusicPlayer" component={MusicPlayer} options={{
                tabBarIcon: () => {
                    return <MaterialIcons name="music-video" size={24} color="#ffbf00" />
                }
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#000',
    },
  });
  
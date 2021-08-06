import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MusicPlayer, MusicList} from '../screens'
import { MaterialIcons } from '@expo/vector-icons';

export default function Navigation() {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator>
            <Tab.Screen name="MusicList" color component={MusicList} tabBarOptions={{
                style: {
                    marginBottom:30
                }
            }} options={{
                tabBarIcon: () => {
                    return <MaterialIcons name="queue-music" size={24} color="black" />
                },
                
            }} />
            <Tab.Screen name="MusicPlayer" component={MusicPlayer} options={{
                tabBarIcon: () => {
                    return <MaterialIcons name="music-video" size={24} color="black" />
                }
            }} />
        </Tab.Navigator>
    )
}
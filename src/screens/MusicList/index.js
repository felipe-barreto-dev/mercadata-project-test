import React, {useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import MusicItemList from '../../components/MusicItemList'
import {Audio} from 'expo-av'

import {styles} from './styles'

export default function MusicList() {

    const {musics} = useSelector((state) => state.musics)

    function handlePressedMusic(music) {
        const playbackObj = new Audio.Sound()
        playbackObj.loadAsync({uri: music.uri}, {shouldPlay: true})
    }

    return (
        <View style={styles.container}>
            <View style={styles.tab}>
                <Text>Music List</Text>
            </View>
            
            <FlatList 
            data={musics.assets}
            renderItem={({item}) => {
            if(item.duration >= 60.000) {
               return <MusicItemList item={item} handlePressedMusic={() => handlePressedMusic(item)}/>
            }
            }}
            keyExtractor={(item) => item.id}
            />
        </View>
    )
}

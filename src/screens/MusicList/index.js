import React, {useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import MusicItemList from '../../components/MusicItemList'
import {Audio} from 'expo-av'
import Header from '../../components/Header'

import {styles} from './styles'

export default function MusicList() {

    const {musics} = useSelector((state) => state.musics)
    const [soundObject, setSoundObject] = useState(null)
    const [currentAudio, setCurrentAudio] = useState({})
    const [playbackAudio, setPlaybackAudio] = useState(new Audio.Sound())

    async function handlePressedMusic(music) {
        if(soundObject === null) {
            const load = await playbackAudio.loadAsync({uri: music.uri})
            const status = await playbackAudio.playAsync()
            setSoundObject(status)
            setCurrentAudio(music)
            
        } else if(soundObject.isLoaded && soundObject.isPlaying && currentAudio.id == music.id) {
            const statusPause = await playbackAudio.pauseAsync()
            setSoundObject(statusPause)
        } else if(
            soundObject.isLoaded && 
            !soundObject.isPlaying && 
            currentAudio.id == music.id) {
            const statusResume = await playbackAudio.playAsync(); 
            setSoundObject(statusResume)    
        } else if(soundObject.isLoaded && 
            currentAudio.id != music.id) {
            console.log("oco")
            await playbackAudio.stopAsync()
            await playbackAudio.unloadAsync()
            const load = await playbackAudio.loadAsync({uri: music.uri})
            const status = await playbackAudio.playAsync()
            setSoundObject(status)
            setCurrentAudio(music)
        }

    }

    return (
        <View style={styles.container}>
            
            <Header></Header>
            
            <View style={styles.containerFlatlist}>
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
                
        </View>
    )
}

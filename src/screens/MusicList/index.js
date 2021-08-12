import React, {useState, useEffect} from 'react'
import { View, Text, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import MusicItemList from '../../components/MusicItemList'
import {Audio} from 'expo-av'
import Header from '../../components/Header'
import { setMusic, setPositionMillis } from '../../redux/modules/musics';

import {styles} from './styles'

export default function MusicList() {

    const {musics} = useSelector((state) => state.musics)
    const dispatch = useDispatch()

    const [musicsState, setMusicsState] = useState(null)
    const [soundObject, setSoundObject] = useState(null)
    const [currentAudio, setCurrentAudio] = useState(null)
    const [playbackAudio, setPlaybackAudio] = useState(new Audio.Sound())

    // const onPlaybackStatusUpdate = async playbackStatus => {
    //     if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
    //         console.log(playbackStatus.positionMillis)
    //         // dispatch(setPositionMillis(playbackStatus.positionMillis))    
    //     }  

    //     if(playbackStatus.didJustFinish) {
    //         const nextMusic = (currentAudio.id + 1)
    //         const music = musics[nextMusic]
    //         setMusicsState('playing')
    //         await playbackAudio.stopAsync()
    //         await playbackAudio.unloadAsync()
    //         const loadNext = await playbackAudio.loadAsync({uri: music.uri})
    //         const statusNext = await playbackAudio.playAsync()
    //         setSoundObject(statusNext)
    //         setCurrentAudio(music)
    //     }
    // }

    async function handlePressedMusic(music) {

        if  (soundObject == null) { // Toca a música pela primeira vez

            setMusicsState('playing')
            const load = await playbackAudio.loadAsync({uri: music.uri})
            const status = await playbackAudio.playAsync()
            setSoundObject(status)
            setCurrentAudio(music)       
            // return playbackAudio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            
        } else if   (soundObject.isLoaded && soundObject.isPlaying && currentAudio.id == music.id) { // Pausa a música atual

            setMusicsState('stopped')
            const statusPause = await playbackAudio.pauseAsync()
            setSoundObject(statusPause)
            
        } else if   (
            soundObject.isLoaded && 
            !soundObject.isPlaying && 
            currentAudio.id == music.id) { // Retoma a música atual

            setMusicsState('playing')
            const statusResume = await playbackAudio.playAsync(); 
            setSoundObject(statusResume)    
            
        } else if   (soundObject.isLoaded && currentAudio.id != music.id) { // Seleciona outra música

            setMusicsState('playing')
            await playbackAudio.stopAsync()
            await playbackAudio.unloadAsync()
            const loadNext = await playbackAudio.loadAsync({uri: music.uri})
            const statusNext = await playbackAudio.playAsync()
            setSoundObject(statusNext)
            setCurrentAudio(music)
            
        }

    }

    useEffect(() => {
        
        dispatch(setMusic(soundObject))
        
    }, [soundObject])


    const item = ({item}) => {
        if(item.duration >= 60.000) {
        return <MusicItemList currentAudio={currentAudio ? currentAudio.id : null} musicsState={musicsState} item={item} handlePressedMusic={() => handlePressedMusic(item)}/>
        }
    }

    return (
        <View style={styles.container}>
            
            <Header></Header>
            
            <FlatList 
            data={musics.assets}
            renderItem={item}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
            updateCellsBatchingPeriod={100}
            windowSize={11}
            /> 
             
        </View>
    )
}

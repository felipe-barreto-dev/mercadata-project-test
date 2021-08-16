import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import MusicItemList from '../../components/MusicItemList'
import {Audio} from 'expo-av'
import Header from '../../components/Header'
import OptionsModal from '../../components/Modal'
import { setMusic } from '../../redux/modules/musics'
import {play, pause, resume, playNext, convertTime} from '../../audioController'
import Slider from '@react-native-community/slider';

import {styles} from './styles'

const width = Dimensions.get('window').width

export default function MusicList() {

    const {musics} = useSelector((state) => state.musics)
    const dispatch = useDispatch()

    const [musicsState, setMusicsState] = useState(null)
    const [soundObject, setSoundObject] = useState(null)
    const [currentAudio, setCurrentAudio] = useState(null)
    const [playbackAudio, setPlaybackAudio] = useState(new Audio.Sound())
    const [showModal, setShowModal] = useState(false)
    const [durationMillis, setDurationMillis] = useState(null)
    const [positionMillis, setPositionMillis] = useState(null)
    const [currentPosition, setCurrentPosition] = useState(0)

    var timeMusic = currentAudio ? (currentAudio.duration / 60).toFixed(2) + "" : ""
    timeMusic = timeMusic.replace(".", ":")

    

    function valueSeekBar() {
        if(durationMillis !== null && positionMillis !== null) {
            return positionMillis / durationMillis
        }
        return 0
    }

    function handlePressedOptions() {
        setShowModal(true)
    }

    const onPlaybackStatusUpdate = async playbackStatus => {

        if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
            setPositionMillis(playbackStatus.positionMillis)
            setDurationMillis(playbackStatus.durationMillis)
            // dispatch(setPositionMillis(playbackStatus.positionMillis))    
        }  

    }

    async function handlePressedMusic(music) {

        if  (soundObject == null) {
        // Toca a música pela primeira vez

            setMusicsState(true)
            const status = await play(playbackAudio, music.uri)
            setSoundObject(status)
            setCurrentAudio(music)       
            return playbackAudio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            
        } else if   (soundObject.isLoaded && soundObject.isPlaying && currentAudio.id == music.id) {
        // Pausa a música atual

            setMusicsState(false)
            const status = await pause(playbackAudio)
            setSoundObject(status)
            
        } else if   (
            soundObject.isLoaded && 
            !soundObject.isPlaying && 
            currentAudio.id == music.id) { 
        // Retoma a música atual

            setMusicsState(true)
            const status = await resume(playbackAudio)
            setSoundObject(status)    
            
        } else if   (soundObject.isLoaded && currentAudio.id != music.id) { 
        // Seleciona outra música
            
            const status = await playNext(playbackAudio, music.uri)
            setMusicsState(true)
            setSoundObject(status)
            setCurrentAudio(music)
            return playbackAudio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            
        }

    }

    useEffect(() => {
        
        dispatch(setMusic(soundObject))
        
    }, [soundObject])

    const item = ({item}) => {
        if(item.duration >= 60.000) {
        return <MusicItemList currentAudio={currentAudio ? currentAudio.id : null} musicsState={musicsState} item={item} handlePressedModal={() => setShowModal(true)} handlePressedMusic={() => handlePressedMusic(item)}/>
        }
    }

    return (
        <View style={styles.container}>
            
            <Header soundOBJ={soundObject} playbackOBJ={playbackAudio} durationMillis={durationMillis} positionMillis={positionMillis} changeStates={() => changeStates} ></Header>

            {soundObject &&
            <View style={styles.controller}>
                <View style={styles.containerCurrentMusic}>
                    <Text numberOfLines={1} style={styles.titleCurrentMusic}>{currentAudio ? currentAudio.filename : ""}</Text>
                </View>
                <View style={styles.seekbar} >
                    <Text style={styles.time}>{currentAudio &&
                    convertTime(currentAudio.duration)}</Text>
                    <Slider
                        style={{width: width * 0.7, height: 40,}}
                        minimumValue={0}
                        maximumValue={1}
                        value={valueSeekBar()}
                        minimumTrackTintColor="#ffbf00"
                        maximumTrackTintColor="#000000"
                        onValueChange={value => {
                            if(currentAudio) {
                                setCurrentPosition(convertTime(value * currentAudio.duration)); 
                            }
                            setCurrentPosition(0)
                            }}
                        onSlidingStart={async () => {
                            if (!musicsState) return;
                    
                            try {
                                await pause(playbackAudio);
                                
                            } catch (error) {
                                console.log('error inside onSlidingStart callback', error);
                            }
                        }}
                        onSlidingComplete={ async (value) => {
                            if(soundObject === null || !musicsState) return 

                            try{

                                const status = await playbackAudio.setPositionAsync(value * durationMillis)
                                setSoundObject(status)
                                setPositionMillis(status.positionMillis)
                                await resume(playbackAudio)
                                    
                                
                            } catch(error) {
                                console.log(error)
                            }
                                    
                            
                        }}
                    />
                    <Text style={styles.time}>{positionMillis || positionMillis !== 0 ? convertTime(positionMillis / 1000) : "00:00"}</Text>
                </View>
                
            </View>
              
            }
  
            <FlatList 
            data={musics.assets}
            renderItem={item}
            keyExtractor={(item) => item.id}
            windowSize={15}
            /> 

            <OptionsModal show={showModal} />
             
        </View>
    )
}

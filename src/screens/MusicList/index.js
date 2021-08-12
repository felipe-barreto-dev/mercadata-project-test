import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import MusicItemList from '../../components/MusicItemList'
import {Audio} from 'expo-av'
import Header from '../../components/Header'
import OptionsModal from '../../components/Modal'
import { setMusic, setPositionMillis } from '../../redux/modules/musics';
import {play, pause, resume, playNext} from '../../audioController'
import Slider from '@react-native-community/slider';

import {styles} from './styles'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

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

    const convertTime = minutes => {
        if (minutes) {
          const hrs = minutes / 60;
          const minute = hrs.toString().split('.')[0];
          const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
          const sec = Math.ceil((60 * percent) / 100);
          if (parseInt(minute) < 10 && sec < 10) {
            return `0${minute}:0${sec}`;
          }
      
          if (sec == 60) {
            return `${minute + 1}:00`;
          }
      
          if (parseInt(minute) < 10) {
            return `0${minute}:${sec}`;
          }
      
          if (sec < 10) {
            return `${minute}:0${sec}`;
          }
      
          return `${minute}:${sec}`;
        }
      };

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

        if  (soundObject == null) { // Toca a música pela primeira vez

            setMusicsState(true)
            const status = await play(playbackAudio, music.uri)
            setSoundObject(status)
            setCurrentAudio(music)       
            return playbackAudio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            
        } else if   (soundObject.isLoaded && soundObject.isPlaying && currentAudio.id == music.id) { // Pausa a música atual

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
        return <MusicItemList currentAudio={currentAudio ? currentAudio.id : null} musicsState={musicsState} item={item} handlePressedModal={() => handlePressedOptions()} handlePressedMusic={() => handlePressedMusic(item)}/>
        }
    }

    return (
        <View style={styles.container}>
            
            <Header soundOBJ={soundObject} playbackOBJ={playbackAudio} durationMillis={durationMillis} positionMillis={positionMillis} changeStates={() => changeStates} ></Header>

            <Slider
                    style={{width: width, height: 40,}}
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

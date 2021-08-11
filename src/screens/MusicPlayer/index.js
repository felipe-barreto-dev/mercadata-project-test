import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import {styles} from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome, Foundation } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { setMusic } from '../../redux/modules/musics'

const width = Dimensions.get("window").width

export default function MusicPlayer() {

    const {music, positionMillis} = useSelector((state) => state.musics)

    const [musicIsPlaying, setMusicIsPlaying] = useState(false)
    const [valueSeekBar, setValueSeekBar] = useState(0)

    console.log(positionMillis)
    
    useEffect(() => {
        if(music) {
            setMusicIsPlaying(music.isPlaying) 
        }
    }, [music])

   
    return (
        <View style={styles.container}>

            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="music-box" size={300} color="#ffbf00" />
            </View>   
            
            <View style={styles.musicTitleContainer}>

               <Text numberOfLines={1} style={styles.musicTitle}>Audio filename - arctic monkeys</Text>
                
            </View>

            <View style={styles.seekBar} >
                <Slider
                    style={{width: width, height: 40,}}
                    minimumValue={0}
                    maximumValue={1}
                    value={valueSeekBar}
                    minimumTrackTintColor="#ffbf00"
                    maximumTrackTintColor="#000000"
                />  
            </View>
            <View style={styles.controller}>

                <Foundation style={styles.controller} name="previous" size={40} color="#ffbf00" />
                {musicIsPlaying == true &&
                <FontAwesome style={styles.controller} name="pause" size={40} color="#ffbf00" />}

                {musicIsPlaying == false &&
                <FontAwesome style={styles.controller} name="play" size={40} color="#ffbf00" />
                }
                
                
                <Foundation style={styles.controller} name="next" size={40} color="#ffbf00" />

            </View>
                
           
            
        </View>
    )
}

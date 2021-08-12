import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import {styles} from './styles'
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { setMusic } from '../../redux/modules/musics'

const width = Dimensions.get("window").width

export default function MusicPlayer() {

    const {music, positionMillis} = useSelector((state) => state.musics)

    const [musicIsPlaying, setMusicIsPlaying] = useState(false)

    // console.log(positionMillis)

    // const valueSeekBar = () => {
        
    //     if (music == null || positionMillis == 0) {
    //         return 0
    //     } else {
    //         return (positionMillis + 1) / music.durationMillis
    //     }
       
    // }
    
    useEffect(() => {
        if(music) {
            // valueSeekBar()
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
                    value={0}
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

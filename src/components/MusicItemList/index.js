import React, { Fragment } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome } from '@expo/vector-icons';
import {convertTime} from '../../audioController'

export default function MusicItemList({currentAudio, musicsState, item, handlePressedMusic, handleShowModal}) {
            
    return ( 
    <Fragment>
        <TouchableOpacity onPress={handlePressedMusic}>
           
                <View style={styles.containerItemList}>
                <View style={styles.leftContainer}>
                    <View style={styles.thumb}>
                        <Text style={styles.thumbIcon}>
                            {musicsState == null || currentAudio !== item.id ? 
                            (item.filename.charAt(0).toUpperCase()) : null }
                            {musicsState && currentAudio == item.id &&
                            <FontAwesome name="pause-circle-o" size={30} color="#ffbf00" />}
                            {!musicsState && currentAudio == item.id &&
                            <FontAwesome name="play-circle-o" size={30} color="#ffbf00" />}
                        </Text>
                    </View>
                    <View style={styles.musicTitleContainer}>
                        <Text style={styles.musicTitle} numberOfLines={1} >
                            {item.filename}
                        </Text>
                        <Text style={styles.timeTitle} numberOfLines={1} >
                            {convertTime(item.duration)}
                        </Text>
                    </View>  
                </View>
               
                <View  style={styles.rightContainer}>
                    <Entypo onPress={handleShowModal} name="dots-three-vertical" size={24} color="#666" />
                </View>
               
                </View>
                <View style={styles.separator} /> 
            
        </TouchableOpacity>
        
    </Fragment>      
    )
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    containerItemList:{
        backgroundColor: "#333",
        width: width,
        padding:15,
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",
    },
    leftContainer:{
        flex:1,
        justifyContent:"flex-start",
        flexDirection:"row"
    },
    thumb:{
        flexBasis:50,
        justifyContent:"center",
        alignItems:"center",
    },
    thumbIcon:{
        fontSize:22,
        fontWeight:"bold",
        color: "#ffbf00"
    },
    musicTitleContainer:{
        flex:1,
        justifyContent:"center",
    },
    musicTitle:{
        fontSize:16,
        color: "#fff"
    },
    rightContainer:{
        justifyContent:"flex-end",
        flexBasis:50,
        justifyContent:"center",
        alignItems:"center",
    },
    timeTitle:{
        color: "#ccc"
    },
    separator:{
        alignSelf: "center",
        width: width - 40,
        height: 1,
        backgroundColor: "#666"
    }
})
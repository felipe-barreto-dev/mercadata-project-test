import React, { Fragment } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'


export default function Header({durationMillis, positionMillis, soundOBJ, playbackOBJ, changeStates}) {

    

    return (
        
        <View style={styles.containerItemList}>
            <Text style={styles.title}>Suas músicas</Text>
        </View>   
       
    )
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    containerItemList:{
        backgroundColor: "#222",
        width: width,
        padding:10,
        justifyContent:"center",
        alignItems: "center",
    },
    title: {
        fontWeight:"bold",
        fontSize: 22,
        color:"#fff"
    },
    seekBar:{
        paddingTop:25
    }

})
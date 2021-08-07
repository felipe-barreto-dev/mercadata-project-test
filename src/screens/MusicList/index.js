import React, {useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

export default function MusicList() {

    const {musics} = useSelector((state) => state.musics)
   
    console.log(musics)

    return (
        <View>
            <Text>Music List</Text>
            <FlatList 
            data={musics.assets}
            renderItem={({item}) => {
            if(item.duration >= 60.000) {
               return <Text>{item.filename}</Text> 
            }
            }}
            keyExtractor={(item) => item.id}
            />
        </View>
    )
}

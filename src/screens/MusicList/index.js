import React, {useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import MusicItemList from '../../components/MusicItemList'

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
               return <MusicItemList item={item} />
            }
            }}
            keyExtractor={(item) => item.id}
            />
        </View>
    )
}

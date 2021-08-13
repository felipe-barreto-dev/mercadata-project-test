import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { setMusics } from './src/redux/modules/musics';
import { useDispatch, useSelector, Provider } from 'react-redux';
import {MusicList} from './src/screens'

import store from './src/redux/store';

// var obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0}
// var result = Object.keys(obj).map(function(key) {
//   return [Number(key), obj[key]];
// });

// console.log(result);

export default function AppWrapper() {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App() {

  const [arrayMusics, setArrayMusics] = useState(null)
  const dispatch = useDispatch()

  const alert = () => {
    Alert.alert(
      "Permissão do usuário",
      "Antes de ouvir suas músicas favoritas, por favor, permita que o aplicativo acesse as mídias em seu dispositivo",
      [{text: "Claro!", onPress: () => getPermission() },
      {text: "Cancelar", onPress: () => alert() }])
  }

  const getMusicsFromDevice = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType:"audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType:"audio",
      first: media.totalCount
    });
    
    dispatch(setMusics(media))
  }

  const getPermission = async () => {

    const permission = await MediaLibrary.getPermissionsAsync()

    if(permission.granted){
      getMusicsFromDevice()
    } else if (!permission.granted && permission.canAskAgain){
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()
      if(status === "denied" && canAskAgain) {
        alert()
      }
      if(status === "granted"){
        getMusicsFromDevice()
      } 
      if(status === "denied" && !canAskAgain){
        alert()
      }
    }
  }

  useEffect(
    () => {
      getPermission()
    }, []
  )

  return (
    <View style={styles.container}>
      <MusicList />
      <StatusBar style="light" backgroundColor="#222" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333"
  },
  
});

import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Navigation from './src/navigation'
import { NavigationContainer } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import { setMusics } from './src/redux/modules/musics';
import { useDispatch, useSelector, Provider } from 'react-redux';

import store from './src/redux/store';

export default function AppWrapper() {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App() {

  const [medias, setMedias] = useState(null)
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
    setMedias(media) 
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
      }
    }
  }

  useEffect(
    () => {
      getPermission()
    }, []
  )

  return (
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

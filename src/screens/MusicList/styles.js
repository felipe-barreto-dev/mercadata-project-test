import {StyleSheet, StatusBar} from 'react-native'

export const styles = StyleSheet.create({
    container: {
      backgroundColor: '#333',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },


});
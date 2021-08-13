import {StyleSheet, StatusBar, Dimensions} from 'react-native'

export const styles = StyleSheet.create({
    container: {
      backgroundColor: '#333',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      height: Dimensions.get('window').height * 1.2,
    },
    controller: {
      backgroundColor: '#222',
      padding: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    titleCurrentMusic: {
      color: "#fff",
      fontSize: 18,
      marginBottom: 30,
    },
    containerCurrentMusic: {     
      flex: 1,
      marginBottom: 30,
      paddingHorizontal: 10
    },
    seekbar: {
      flexDirection: "row",
      alignItems: "center"
    },
    time: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold"
    },
   

});
import {StyleSheet, StatusBar} from 'react-native'


export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#333',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: "center",
        justifyContent: "center",
    },
    musicTitleContainer:{
        flex:1,
        padding:15
    },
    musicTitle:{
        fontSize:18,
        color: "#fff",
        fontWeight:"bold"
    },
    controller:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:20,
        marginHorizontal:25
    },
    seekBar:{
        paddingBottom:25
    }


});
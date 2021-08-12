import React, { Fragment } from 'react'
import { Text, View, StyleSheet, Dimensions, Modal, StatusBar } from 'react-native'

export default function OptionsModal({show}) {

    return (
        
        <Fragment>
            <StatusBar hidden />
            <Modal animationType="slide" transparent visible={show}>
                <View style={styles.container}>
                    <Text numberOfLines={2} style={styles.titleMusic}>arctic monkeys - cant stop</Text>
                    <View style={styles.containerPlay}>
                        <Text style={styles.play}>Play</Text>
                    </View>
                </View>
                <View style={styles.modalBG} />
            </Modal>
        </Fragment>
        
    )
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#ddd',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    containerPlay: {
        padding: 20
    },
    titleMusic: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
    },
    play:{
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
        letterSpacing: 1
    },
    modalBG: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }

})
import React, { Fragment } from 'react'
import { Text, View, StyleSheet, Dimensions, Modal, StatusBar } from 'react-native'

export default function Modal({show}) {

    return (
        
        <Fragment>
            <StatusBar hidden />
            <Modal visible={show}>
            
            </Modal>
        </Fragment>
       
        
    )
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    
})
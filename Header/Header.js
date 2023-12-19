import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, FontAwesome } from 'react-native-vector-icons';

export default function Header({ user }){
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.user}>
                    {user}
                </Text>
                <TouchableOpacity style={styles.profile}>

                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffdbe7',
        paddingTop: 45,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 50,
        position: 'absolute',
    },
    content:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    user:{
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        paddingStart: 15,
    },
})
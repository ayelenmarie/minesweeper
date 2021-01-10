import React, { useCallback } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Colors } from '../theme/Colors'

import { ThrottledTouchableOpacity } from '~/components/common/ThrottledTouchableOpacity'
import { Navigation } from 'react-native-navigation'
import { ScreenIds } from '~/navigation'
import { Board } from '~/components/board/Board'

export interface Props {
    componentId: string
}

const HomeScreen: React.FC<Props> = props => {
    const { componentId } = props
    const handleGamePress = useCallback(() => {
        Navigation.push(componentId, {
            component: {
                name: ScreenIds.GAME
            }
        })
    }, [])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text style={styles.sectionTitle}>MINESWEEPER</Text>
                <ThrottledTouchableOpacity onPress={handleGamePress}>
                    <Text>START</Text>
                </ThrottledTouchableOpacity>
            </SafeAreaView>
        </>
    )
}

/*
 * Styles
 */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PINK,
        justifyContent: 'center',
        alignItems: 'center'
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.MUSTARD
    },

    subtitle: {
        fontSize: 18,
        fontWeight: '400',
        color: Colors.LIGHT_BLUE
    }
})

export default HomeScreen

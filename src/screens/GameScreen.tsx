import React, { useCallback } from 'react'

import { Navigation } from 'react-native-navigation'
import { GameView } from '~/views/GameView'

/*
 * Types
 */

type GameProps = {
    componentId: string
}

const GameScreen = ({ componentId }: GameProps) => {
    const handleBackPress = useCallback(() => {
        Navigation.pop(componentId)
    }, [])

    return <GameView onBackPress={handleBackPress} />
}

export default GameScreen

import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { throttle } from 'lodash'

/**
 * Constants
 */

const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 }

/**
 * ThrottledTouchableOpacity
 */

export const ThrottledTouchableOpacity: React.FC<{ throttleInterval?: number; onPress: () => void }> = ({
    children,
    throttleInterval,
    onPress
}) => {
    const handleOnPress = useCallback(throttle(onPress, throttleInterval, { trailing: false }), [
        throttleInterval,
        onPress
    ])

    return (
        <TouchableOpacity hitSlop={HIT_SLOP} onPress={handleOnPress}>
            {children}
        </TouchableOpacity>
    )
}

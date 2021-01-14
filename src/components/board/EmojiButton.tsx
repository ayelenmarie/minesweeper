import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '~/theme/Colors';
import { EmojiState, EmojiType } from '~/types/EmojiTypes';

interface EmojiButtonProps {
  emoji: EmojiType;
  pressed: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
  onPress: () => void;
}

interface ContainerProps {
  pressed: boolean;
}

export const EmojiButton: React.FC<EmojiButtonProps> = ({
  emoji,
  pressed,
  onPress,
  onPressIn,
  onPressOut,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Container pressed={pressed}>
        <Emoji>{emoji}</Emoji>
      </Container>
    </TouchableWithoutFeedback>
  );
};

/*
 * Styles
 */

const Container = styled.View<ContainerProps>`
  width: 60;
  height: 40;
  margin: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.PINK_600};

  /* Change borders to simulate pressed button */
  border-top-color: ${(props) => (props.pressed ? Colors.PINK_800 : Colors.PINK_100)};
  border-left-color: ${(props) => (props.pressed ? Colors.PINK_800 : Colors.PINK_100)};
  border-right-color: ${(props) => (props.pressed ? Colors.PINK_100 : Colors.PINK_800)};
  border-bottom-color: ${(props) => (props.pressed ? Colors.PINK_100 : Colors.PINK_800)};
  border-width: 3px;
`;

const Emoji = styled.Text`
  font-size: 20;
`;

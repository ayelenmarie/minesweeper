import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

import { Colors } from '../theme/Colors';

export interface HomeProps {
  onEasyPress: () => void;
  onMediumPress: () => void;
  onHardPress: () => void;
}

export const HomeView: React.FC<HomeProps> = ({ onEasyPress, onMediumPress, onHardPress }) => {
  return (
    <Container>
      <Title>MINESWEEPER</Title>
      <Spacer />
      <Subtitle>SELECT GAME DIFFICULTY</Subtitle>
      <Spacer />
      <TouchableWithoutFeedback onPress={onEasyPress}>
        <ButtonText>EASY 🙂</ButtonText>
      </TouchableWithoutFeedback>
      <Spacer />

      <TouchableWithoutFeedback onPress={onMediumPress}>
        <ButtonText>MEDIUM 🤪</ButtonText>
      </TouchableWithoutFeedback>
      <Spacer />

      <TouchableWithoutFeedback onPress={onHardPress}>
        <ButtonText>HARD ☠️</ButtonText>
      </TouchableWithoutFeedback>
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.PINK_500};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${Colors.MUSTARD};
`;

const Subtitle = styled.Text`
  font-size: 25px;
  color: ${Colors.PURPLE};
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: ${Colors.MUSK_GREEN};
`;

const Spacer = styled.View`
  height: 20px;
`;

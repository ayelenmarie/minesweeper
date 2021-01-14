import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '~/theme/Colors';

interface NumberDisplayProps {
  value: number;
}

export const NumberDisplay: React.FC<NumberDisplayProps> = ({ value }) => {
  const formattedValue = value.toString().padStart(3, '0');
  const negativeFormattedValue = Math.abs(value).toString().padStart(2, '0');

  return (
    <Container>
      <Number>{value < 0 ? `-${negativeFormattedValue}` : formattedValue}</Number>
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.View`
  margin: 10px;
  background-color: ${Colors.PINK};
  border-width: 3px;
  border-top-color: ${Colors.PINK_100};
  border-left-color: ${Colors.PINK_100};
  border-right-color: ${Colors.PINK_800};
  border-bottom-color: ${Colors.PINK_800};
  width: 60px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const Number = styled.Text`
  color: ${Colors.PINK_100};
  font-weight: 800;
`;

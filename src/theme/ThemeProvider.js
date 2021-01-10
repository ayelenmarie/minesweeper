import React, {useState, useContext, createContext} from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';

import {themes} from '~/theme/theme';

const ThemeContext = createContext({theme: 'light', setTheme: () => {}});
export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  const value = {theme, setTheme};

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={themes[theme]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.defaultProps = {
  children: null,
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
export const useTheme = () => useContext(ThemeContext);

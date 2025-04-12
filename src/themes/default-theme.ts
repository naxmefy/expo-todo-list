import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

export default defaultTheme
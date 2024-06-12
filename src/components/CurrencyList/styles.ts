import { StyleSheet } from 'react-native';
import { useThemeStyle } from '../../contexts/theme';

export const stylesCollections = () => {
    const { theme } = useThemeStyle();
    return StyleSheet.create({
        list: {
            paddingVertical: 10,
            backgroundColor: theme.scrim,
        },
        card: {
            marginHorizontal: 10,
            padding: 10,
            backgroundColor: theme.surfaceContainerLowest, 
            borderRadius: 10,
            alignItems: 'center',
            minHeight: 60,
            minWidth: 100,
        },
        selectedCard: {
            borderColor: 'blue',
            borderWidth: 2,
        },
        name: {
            fontWeight: 'bold',
            color: theme.surfaceBright
        },
        variation: {
            fontSize: 12,
        },
        price: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.surfaceBright
        },
    });
};

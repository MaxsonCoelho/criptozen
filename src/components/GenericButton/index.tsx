import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import { useThemeStyle } from '../../contexts/theme';
import { stylesCollections } from './styles';


type HeaderLeft = 
| 'logout' 
| 'active_check'
| 'inactive_check'
| 'filter'
| 'null';
interface ButtonProps {
  color?: string;
  width?: number | undefined | `${number}%`;
  executeFunction?: () => void;
  handleSubmitForm?: (values: any) => Promise<void>;
  title: string;
  colorTitle?: string;
  iconLeft?: HeaderLeft;
}

export default function ButtonGeneric({
  color,
  width,
  executeFunction,
  title,
  handleSubmitForm,
  colorTitle,
  iconLeft
}: ButtonProps): JSX.Element {
  const styles = stylesCollections();
  const { theme } = useThemeStyle();

  return (
    <TouchableOpacity
      style={[
        styles.Container,
        {
          width: width ? width! : '50%',
          backgroundColor: color,
          flexDirection: iconLeft && 'row'!!,
          alignItems: iconLeft && 'center'!!
        },
      ]}
      onPress={executeFunction || handleSubmitForm}
      activeOpacity={0.7}
      testID='button-generic'
    >
      {iconLeft == 'logout' && <Material name='logout' size={25} color={theme.onSurfaceVariant} />}
      <Text style={[styles.Title, { color: colorTitle }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

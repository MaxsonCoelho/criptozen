import React, { useEffect, useState } from 'react';
import { View, Text, TextInputProps } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { stylesCollections } from './styles';
import GenericButton from '../GenericButton';
import { useThemeStyle } from '../../contexts/theme';

interface ButtonProps{
  title: string;
  onPress: (text?: string) => void;
  colorTitle?: string;
  paddingHorizontal?: number;
}

export interface GeneralModalProps {
  isVisible: boolean;
  closeModal?: () => void;
  title?: string;
  description?: string;
  icon?: string; // Nome do ícone Ionicons
  buttons?: ButtonProps[] | undefined;
  AlignText?: AlignTypes;
  iconColor?: string;
  colorText?: string;
  activeProgress?: boolean;
}

type AlignTypes = 'auto' | 'center' | 'left' | 'right' | 'justify' | undefined;

export const GenericModal: React.FC<GeneralModalProps> = ({
  isVisible,
  closeModal,
  title,
  description,
  icon,
  buttons = [],
  AlignText,
  iconColor,
  colorText,
}) => {
  const [textValue, setTextValue] = useState<string>('');
  const styles = stylesCollections();
  const { theme } = useThemeStyle();

  const renderButtons = () => {
    return buttons.map((button, index) => (
      <GenericButton
        key={index}
        title={button.title}
        executeFunction={() => button.onPress(textValue)}
        colorTitle={button.colorTitle}
      />
    ));
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      testID='modal'
    >
      <View style={styles.modalContainer} testID='container'>
        {icon && (
          <Ionicons testID='icon' name={icon} size={40} color={iconColor} style={styles.icon} />
        )}
        {title && (
          <Text testID='title' style={[styles.title, { textAlign: AlignText ?? 'center' }]}>
            {title}
          </Text>
        )}
        <View style={styles.descriptionContainer}>
          {description && <Text testID='description' style={[styles.description, {color: colorText ? colorText : theme.onSurface}]}>{description}</Text>}
        </View>
        <View testID='buttons-container' style={styles.buttonContainer}>{renderButtons()}</View>
      </View>
    </Modal>
  );
};

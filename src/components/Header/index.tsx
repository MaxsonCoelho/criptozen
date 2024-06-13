import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { stylesCollections } from './styles';
import { useThemeStyle } from '../../contexts/theme';

type HeaderLeft = 'back' | 'null';
type HeaderRight =
  | 'menu_points'
  | 'active_check'
  | 'inactive_check'
  | 'filter'
  | 'null';

interface MenuProps {
  iconLeft?: HeaderLeft;
  iconRight?: HeaderRight;
  title?: string;
  accountPage?: boolean;
  onPressButtonRight?: () => void;
  filterCounter?: number;
}

export default function Header({
  iconLeft,
  iconRight,
  title,
  onPressButtonRight,
  accountPage = false,
  filterCounter,
}: MenuProps): JSX.Element {
  const styles = stylesCollections();
  const { theme } = useThemeStyle();
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation() as any;

  function handleButtonLeft() {
    iconLeft == 'back' && navigation?.goBack();
  }

  function handleButtonRight() {
    iconRight == 'menu_points' && onPressButtonRight!();
    iconRight == 'filter' && navigation?.navigate('samplesFilter');
  }

  return (
    <View
      style={[
        styles.container,
        { width: screenWidth, borderBottomColor: theme.surfaceBright },
      ]}
    >
      <TouchableOpacity
        onPress={handleButtonLeft}
        activeOpacity={1}
        testID="back-icon"
      >
        {iconLeft == 'back' && (
          <Ionicons
            name="chevron-back"
            size={25}
            color={theme.onSurfaceVariant}
          />
        )}
        {iconLeft == 'null' && null}
      </TouchableOpacity>
      <View
        style={[
          styles.titleContainer,
          accountPage && { alignItems: 'flex-start' },
        ]}
      >
        {title ? (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.title, { color: theme.onBackground }]}
          >
            {title}
          </Text>
        )
        :
          <Image width={25} height={25} source={require('../../assets/images/coin-icon-32.png')} />
        }
      </View>
      <TouchableOpacity onPress={handleButtonRight} activeOpacity={0.6}>
        {iconRight == 'menu_points' && (
          <Ionicons
            name="ellipsis-vertical"
            size={25}
            color={theme.onSurfaceVariant}
          />
        )}
        {iconRight == 'active_check' && (
          <Ionicons name="checkmark-circle" size={30} color={theme.surfaceBright} />
        )}
        {iconRight == 'inactive_check' && (
          <Ionicons
            name="checkmark-circle"
            size={30}
            color={theme.onSurfaceVariant}
          />
        )}
        {iconRight == 'filter' && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {filterCounter != undefined && filterCounter!=0  && (
              <View style={styles.circleContainer}>
                <View style={styles.circle}>
                  <Text style={styles.countText}>{filterCounter}</Text>
                </View>
              </View>
            )}
            <Ionicons name="funnel-outline" size={20} color={theme.surfaceBright} />
          </View>
        )}
        {iconRight == 'null' && null}
      </TouchableOpacity>
      {accountPage && (
        <TouchableOpacity
          style={{ marginLeft: 18 }}
          onPress={() => navigation.navigate('account')}
        >
          <Ionicons
            name="person-outline"
            size={25}
            color={theme.surfaceBright}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

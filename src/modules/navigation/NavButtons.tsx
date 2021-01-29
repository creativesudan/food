import React from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { Button, IconButton } from '../../components/StyledButton';
import { HOME, QR_DETAILS } from './constants';

interface CancelProps {
  displayDiscard?: boolean;
}

export const CancelButton = ({ displayDiscard }: CancelProps) => {
  const navigation = useNavigation();
  return (
    <Button
      title="Cancel"
      primary
      noBorder
      onPress={() => {
        if (!displayDiscard)
          navigation.reset({
            routes: [{ name: HOME }],
          });
        else {
          Alert.alert(
            'Discard changes?',
            'You have unsaved changes. Are you sure to discard them and leave the screen?',
            [
              { text: "Don't leave", style: 'cancel', onPress: () => {} },
              {
                text: 'Discard',
                style: 'destructive',
                onPress: () => {
                  navigation.reset({
                    routes: [{ name: HOME }],
                  });
                },
              },
            ],
          );
        }
      }}
    />
  );
};

export const DrawerButton = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (
    <IconButton
      primary
      noBorder
      onPress={() => navigation.openDrawer()}
      icon={
        <Image
          source={require('../../../assets/images/icons/menu_icon.png')}
          resizeMode="contain"
          style={{
            height: 14,
            marginLeft: 4,
          }}
        />
      }
    />
  );
};

export const HomeRightButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.RightIcons}>
      <IconButton
        primary
        noBorder
        icon={
          <Image
            source={require('../../../assets/images/icons/home.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        }
      />
      <IconButton
        primary
        noBorder
        onPress={() => navigation.navigate(QR_DETAILS)}
        icon={
          <Image
            source={require('../../../assets/images/icons/scan_1.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  RightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: `${100}%`,
    // TODO
    // height: Header.height,
  },
});

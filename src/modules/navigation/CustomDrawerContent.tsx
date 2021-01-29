import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import * as React from 'react';
import { useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Image, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { IconButton } from '../../components/StyledButton';
import { colors } from '../../styles';
import { Text } from '../../components/StyledText';
import AddAccountDrawer from '../bottomSheets/AddAccountDrawer';
import styles from './styles';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const requestDrawerref = useRef<RBSheet>(null);
  return (
    <>
      <DrawerContentScrollView {...props}>
        <View style={styles.avatarContainer}>
          <View style={styles.backActivity}>
            <View style={{ flex: 1 }}>
              <IconButton
                primary
                noBorder
                onPress={() => props.navigation.closeDrawer()}
                icon={
                  <Image
                    source={require('../../../assets/images/icons/keyboard_backspace.png')}
                    resizeMode="contain"
                    style={{
                      height: 20,
                    }}
                  />
                }
              />
            </View>
            <IconButton
              primary
              noBorder
              onPress={() => props.navigation.navigate('Qr Details')}
              // onPress={() => props.navigation.closeDrawer()}
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

          <View style={styles.profilePart}>
            <Avatar
              rounded
              size={40}
              // avatarStyle={styles.Avtar}
              overlayContainerStyle={{ backgroundColor: colors.white }}
              imageProps={{ resizeMode: 'cover' }}
              source={require('../../../assets/images/server_icon/user_1.png')}
            />
            <View style={styles.nameArea}>
              <Text /* style={styles.userName} */ color={colors.white} h3>
                Andres Gutierrez
              </Text>
              <Text color={colors.primaryLight} p>
                9876543210
              </Text>
            </View>

            <IconButton
              onPress={() => requestDrawerref.current?.open()}
              primary
              noBorder
              icon={
                <Image
                  source={require('../../../assets/images/icons/add_account.png')}
                  resizeMode="contain"
                  style={{
                    height: 20,
                    tintColor: colors.white,
                  }}
                />
              }
            />
          </View>

          <RBSheet
            ref={requestDrawerref}
            height={300}
            animationType="slide"
            dragFromTopOnly
            closeOnDragDown
            closeOnPressMask
            openDuration={100}
            customStyles={{
              wrapper: {},
              container: {
                backgroundColor: colors.veryLight,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              },
              draggableIcon: {},
            }}
          >
            <AddAccountDrawer />
          </RBSheet>

          {/* <View style={styles.shareButton}>
            <Image
              source={require('../../../assets/images/icons/scan_1.png')}
              resizeMode="contain"
              style={styles.shareIcon}
            />
            <Text style={styles.whiteLabel}>Share Your Account</Text>
          </View> */}
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
}

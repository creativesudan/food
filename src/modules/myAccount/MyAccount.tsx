import React, { useState, useCallback, useRef } from "react";
import { View, StyleSheet, Image, Dimensions, SafeAreaView } from 'react-native';
import Ripple from 'react-native-material-ripple';

import MainContainer from '../../components/Containers/Main';
import { SearchBar, Avatar, Icon, ListItem } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from "react-native-gesture-handler";
import { MenuModal } from "../modal/Menu";
import { EditAccount } from "../modal/EditAccount";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth";


export default function AccountView({ navigation }) {

  const [editAccount, setEditAccount] = useState(false);
  const authenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user || {});
  const dispatch = useDispatch();

  return (
    <>

      {editAccount && <EditAccount setEditAccount={setEditAccount} />}

      <View style={{ backgroundColor: colors.bodyBase, flexGrow: 1 }}>
        <View style={styles.header}>
          <View style={styles.fakeBg}>
            <View style={{ position: 'absolute', right: -80, top: 0 }}>
              <Image
                style={{ tintColor: colors.white }}
                source={require('../../../assets/images/pages/login.png')}
              />
            </View>
          </View>
          <MainContainer>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginVertical: 10 }}>

              <View style={{ flex: 1 }}>
                <Text h1 color={colors.white}>{user.mobile}</Text>
                <Text color={colors.white}>{user.name}      </Text>
              </View>

              <View>
                <Button title="Edit" primary
                  onPress={() => {
                    setEditAccount(true);
                  }}
                />
              </View>

            </View>


            <View style={{ marginVertical: 10 }}>
              <Paper style={{ borderRadius: 10 }}>
                <View style={{ marginTop: 20 }}>

                  <ListItem bottomDivider onPress={() => navigation.navigate('Manage Address')}>
                    <Avatar size={20} source={require('../../../assets/images/icons/address.png')} />
                    <ListItem.Content>
                      <ListItem.Title>Manage Address</ListItem.Title>
                    </ListItem.Content>
                    <Image style={styles.rightIcon} source={require('../../../assets/images/icons/right.png')} />
                  </ListItem>

                  <ListItem bottomDivider onPress={() => navigation.navigate('Order List')}>
                    <Avatar size={20} source={require('../../../assets/images/icons/orders_2.png')} />
                    <ListItem.Content>
                      <ListItem.Title>Orders</ListItem.Title>
                    </ListItem.Content>
                    <Image style={styles.rightIcon} source={require('../../../assets/images/icons/right.png')} />
                  </ListItem>

                  <ListItem bottomDivider>
                    <Avatar size={20} source={require('../../../assets/images/icons/discount.png')} />
                    <ListItem.Content>
                      <ListItem.Title>Offer</ListItem.Title>
                    </ListItem.Content>
                    <Image style={styles.rightIcon} source={require('../../../assets/images/icons/right.png')} />
                  </ListItem>

                  <ListItem bottomDivider>
                    <Avatar size={20} source={require('../../../assets/images/icons/heart.png')} />
                    <ListItem.Content>
                      <ListItem.Title>Favorites</ListItem.Title>
                    </ListItem.Content>
                    <Image style={styles.rightIcon} source={require('../../../assets/images/icons/right.png')} />
                  </ListItem>

                </View>

                <View style={{ marginVertical: 40, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <Button title="Logout" lg white outline onPress={() => {
                    dispatch(logout());
                    if (!authenticated) navigation.navigate('Login');
                  }} />
                </View>

              </Paper>
            </View>

            <Text caption hCenter style={{ marginTop: 10 }}>Ver. 0.2.2.10</Text>

          </MainContainer>

        </View>

      </View>



    </>
  )
}

const styles = StyleSheet.create({
  
  rightIcon:{
    tintColor:'#5D6275', width:10, height:10, opacity:0.4
  },
  fakeBg: {
    backgroundColor: colors.primary,
    height: 150,
    width: '100%',
    padding: 20, flex: 1,
    position: 'absolute',
    top: 0
  },
  header: {
    // backgroundColor: colors.primary
  },

  flexContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10, marginHorizontal: -10
  },
  flexList: {
    flexBasis: '33.3%',
    padding: 10,
    alignItems: 'center',
  },
  label: {
    marginTop: 4
  },
  footerMenu: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white
  },
  menuList: {
    flexBasis: '20%',
  }


})
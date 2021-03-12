import React, { useState, useCallback, useRef } from "react";
import { View, StyleSheet, Image, Dimensions, SafeAreaView } from 'react-native';
import Ripple from 'react-native-material-ripple';

import MainContainer from '../../components/Containers/Main';
import { SearchBar, Avatar, Icon, Badge } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';

import { ScrollView } from "react-native-gesture-handler";
import { AddAddress } from "../modal/AddAddress";
import { EditAddress } from "../modal/EditAddress";
import AddressList from "../global/AddressList";

import GetLocation from 'react-native-get-location'


const data = [
  { id: 'a', label: 'Snacks', image: require('../../../assets/images/server_icons/snack.png') },
  { id: 'b', label: 'Sweets', image: require('../../../assets/images/server_icons/sweets.png') },
  { id: 'c', label: 'Cakes', image: require('../../../assets/images/server_icons/cake.png') },
  { id: 'd', label: 'Namken', image: require('../../../assets/images/server_icons/namkeen.png') },
  { id: 'e', label: 'Biscuits', image: require('../../../assets/images/server_icons/biscuits.png') },
  { id: 'f', label: 'Others', image: require('../../../assets/images/server_icons/ice-cream.png') },
];




export default function DeliveryLocationView() {

  const [addAddress, setAddAddress] = useState(false);
  const [locationPick, setLocationPick] = useState({})

  const getCurrentPosition = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(loc => {
      console.log(loc);
      setLocationPick(loc);
    }).catch(error => {
      const { code, message } = error;
      console.warn(code, message);
    });
  };

  return (
    <>
      {addAddress && <AddAddress setAddAddress={setAddAddress} />}

      {/* <View style={styles.header}>
      <MainContainer>
        <View style={{flexDirection: 'row', alignItems: 'center', height:60}}>

            <Text bold>Search Delivery Location</Text>         

        </View>
      </MainContainer>
    </View> */}

      <ScrollView>

        <Ripple style={{ marginVertical: 5, marginTop: 10 }} onPress={getCurrentPosition}>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 46, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: colors.white, }}>
            <Image
              style={{ tintColor: colors.primary, }}
              source={require('../../../assets/images/icons/location.png')}
            />
            <Text style={{ marginLeft: 10 }}>Current Address</Text>

          </View>
        </Ripple>

        <MainContainer>

          <View style={{ marginBottom: 100 }}>
            <AddressList />
          </View>

        </MainContainer>


      </ScrollView>


      <View style={styles.footerMenu}>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Button title="Add Address" lg primary raised

            onPress={() => {
              setAddAddress(true);
            }}

            icon={
              <Image
                style={{ tintColor: colors.white, marginRight: 10 }}
                source={require('../../../assets/images/icons/add.png')}
              />
            }
          />
        </View>
      </View>



    </>
  )
}


const styles = StyleSheet.create({

  header: {
    backgroundColor: colors.white,
    marginBottom: 5
  },

  footerMenu: {
    position: 'absolute', bottom: 20, left: 0, right: 0,
    paddingVertical: 10,
  },


})
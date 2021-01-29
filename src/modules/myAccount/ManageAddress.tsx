import React, { useState, useCallback, useRef } from "react";
import {View, StyleSheet,Image,Dimensions, SafeAreaView} from 'react-native';
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


const data = [
  {id: 'a', label: 'Snacks', image: require('../../../assets/images/server_icons/snack.png')},
  {id: 'b', label: 'Sweets', image: require('../../../assets/images/server_icons/sweets.png')},
  {id: 'c', label: 'Cakes', image: require('../../../assets/images/server_icons/cake.png')},
  {id: 'd', label: 'Namken', image: require('../../../assets/images/server_icons/namkeen.png')},
  {id: 'e', label: 'Biscuits', image: require('../../../assets/images/server_icons/biscuits.png')},
  {id: 'f', label: 'Others', image: require('../../../assets/images/server_icons/ice-cream.png')},
];




export default function ManageAddressView() {
  
  const [addAddress, setAddAddress] = useState(false);

  return (
    <>
    {addAddress && <AddAddress setAddAddress={setAddAddress} />}
    
    <ScrollView>


    <MainContainer>

    <View style={{marginBottom:100, marginTop:10}}>
     <AddressList/>
    </View>
      
    </MainContainer>
    

    </ScrollView>

    
    <View style={styles.footerMenu}>
      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
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

header:{
  backgroundColor: colors.primary,
  marginBottom:5
},

footerMenu:{
  position: 'absolute', bottom: 20, left:0, right:0,
  paddingVertical:10,
},


})
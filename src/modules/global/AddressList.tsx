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
import { DeleteAddressConfirm } from "../modal/DeleteAddress";


const data = [
  {id: 'a', label: 'Snacks', image: require('../../../assets/images/server_icons/snack.png')},
  {id: 'b', label: 'Sweets', image: require('../../../assets/images/server_icons/sweets.png')},
  {id: 'c', label: 'Cakes', image: require('../../../assets/images/server_icons/cake.png')},
  {id: 'd', label: 'Namken', image: require('../../../assets/images/server_icons/namkeen.png')},
  {id: 'e', label: 'Biscuits', image: require('../../../assets/images/server_icons/biscuits.png')},
  {id: 'f', label: 'Others', image: require('../../../assets/images/server_icons/ice-cream.png')},
];




export default function AddressList() {
  
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [deleteAddressConfirm, setDeleteAddressConfirm] = useState(false);

  return (
    <>
    {addAddress && <AddAddress setAddAddress={setAddAddress} />}
    {editAddress && <EditAddress setEditAddress={setEditAddress} />}
    {deleteAddressConfirm && <DeleteAddressConfirm setDeleteAddressConfirm={setDeleteAddressConfirm} />}


      <View style={{marginVertical:5}}>
        <Paper>
          <View style={{  padding:10}}>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ripple style={{flexDirection: 'row', alignItems: 'center', paddingRight:10, flex:1}}>
                  <View style={{width:32}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', width:22, height:22, borderWidth:1, borderColor:'#F9C5C5', borderRadius:100}}>
                        <View style={{marginLeft:6, flexDirection: 'row', width:8, height:8, backgroundColor: colors.primary, borderRadius:10}}></View>
                    </View>
                  </View>
                  <View>
                    <Text p color={colors.primary}>Home</Text>
                    <Text bold>Jhon Doe</Text>
                  </View>
                </Ripple>
                <Badge badgeStyle={{backgroundColor: colors.primary}} value="Default"/>
              </View>

              <View style={{marginTop:6, marginLeft:32, flexDirection: 'row', alignItems: 'flex-end'}}>
                <View style={{flex:1}}>
                  <Text p style={{marginVertical:1}}>11th Ave, Gaur City 2, Ghaziabad</Text>
                  <Text p style={{marginVertical:1}}>Pin - 234321</Text>
                  <Text p style={{marginVertical:1}}>+91 9876543210</Text>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal:-3}}>
                  <View style={{marginHorizontal:3}}>
                    <Button title="Delete" white 
                      onPress={() => {
                        setDeleteAddressConfirm(true);
                      }}
                    />
                  </View>
                  <View style={{marginHorizontal:3}}>
                    <Button title="Edit" white
                      onPress={() => {
                        setEditAddress(true);
                      }}
                    />
                  </View>
                </View>
              </View>
          </View>
        </Paper>
      </View>

      <View style={{marginVertical:5}}>
        <Paper>
          <View style={{  padding:10}}>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ripple style={{flexDirection: 'row', alignItems: 'center', paddingRight:10, flex:1}}>
                  <View style={{width:32}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', width:22, height:22, borderWidth:1, borderColor:'#F9C5C5', borderRadius:100}}>
                        <View style={{marginLeft:6, flexDirection: 'row', width:8, height:8, backgroundColor: '#F3E6E6', borderRadius:10}}></View>
                    </View>
                  </View>
                  <View>
                    <Text p color={colors.primary}>Home</Text>
                    <Text bold>Jhon Doe</Text>
                  </View>
                </Ripple>
                
              </View>

              <View style={{marginTop:6, marginLeft:32, flexDirection: 'row', alignItems: 'flex-end'}}>
                <View style={{flex:1}}>
                  <Text p style={{marginVertical:1}}>11th Ave, Gaur City 2, Ghaziabad</Text>
                  <Text p style={{marginVertical:1}}>Pin - 234321</Text>
                  <Text p style={{marginVertical:1}}>+91 9876543210</Text>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal:-3}}>
                  <View style={{marginHorizontal:3}}>
                    <Button title="Delete" white 
                      onPress={() => {
                        setDeleteAddressConfirm(true);
                      }}
                    />
                  </View>
                  <View style={{marginHorizontal:3}}>
                    <Button title="Edit" white
                      onPress={() => {
                        setEditAddress(true);
                      }}
                    />
                  </View>
                </View>
                
              </View>
          </View>
        </Paper>
      </View>


    </>
  )
}


const styles = StyleSheet.create({

header:{
  backgroundColor: colors.white,
},

footerMenu:{
  position: 'absolute', bottom: 20, left:0, right:0,
  paddingVertical:10,
},


})
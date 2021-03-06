import React, { useState, useCallback, useRef, useEffect } from "react";
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
import { DeleteAddressConfirm } from "../modal/DeleteAddress";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddressList, deleteAddress } from "../../redux/actions/address";
import { add } from "react-native-reanimated";
import { selectDeliveryAddress } from "../../redux/actions/app";

const data = [
  { id: 'a', label: 'Snacks', image: require('../../../assets/images/server_icons/snack.png') },
  { id: 'b', label: 'Sweets', image: require('../../../assets/images/server_icons/sweets.png') },
  { id: 'c', label: 'Cakes', image: require('../../../assets/images/server_icons/cake.png') },
  { id: 'd', label: 'Namken', image: require('../../../assets/images/server_icons/namkeen.png') },
  { id: 'e', label: 'Biscuits', image: require('../../../assets/images/server_icons/biscuits.png') },
  { id: 'f', label: 'Others', image: require('../../../assets/images/server_icons/ice-cream.png') },
];




export default function AddressList() {

  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState({ "show": false });
  const [deleteAddressConfirm, setDeleteAddressConfirm] = useState({ show: false });
  const addresses = useSelector(state => state.address.addresses || []);
  const dispatch = useDispatch();



  useEffect(() => {
    if (deleteAddressConfirm.confirm) {
      dispatch(deleteAddress(deleteAddressConfirm.id))
      // console.log(deleteAddressConfirm);
      setDeleteAddressConfirm({ show: false });
    }
  }, [deleteAddressConfirm]);

  useEffect(() => {
    if (!addresses || addresses.length == 0) dispatch(fetchAddressList());
  }, []);

  const getAddressType = (id) => {
    if (id == 1) return "Work";
    if (id == 2) return "Home";
    else return "Other";
  }

  const selectedDeliveryAddress = useSelector(state => state.app.address || {});

  return (
    <>
      {addAddress && <AddAddress setAddAddress={setAddAddress} />}
      {editAddress.show && <EditAddress setEditAddress={setEditAddress} editAddress={editAddress.address} />}
      {deleteAddressConfirm.show && <DeleteAddressConfirm setDeleteAddressConfirm={setDeleteAddressConfirm} id={deleteAddressConfirm.id} />}

      {addresses.map(address => <View style={{ marginVertical: 5 }} key={address.id}>
        <Paper>
          <View style={{ padding: 10 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ripple style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10, flex: 1 }} onPress={() => dispatch(selectDeliveryAddress(address))}>
                <View style={{ width: 32 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 22, height: 22, borderWidth: 1, borderColor: '#F9C5C5', borderRadius: 100 }}>
                    <View style={{ marginLeft: 6, flexDirection: 'row', width: 8, height: 8, backgroundColor: selectedDeliveryAddress.id == address.id ? colors.primary : colors.white, borderRadius: 10 }}></View>
                  </View>
                </View>
                <View>
                  <Text p color={colors.primary}>{getAddressType(address.address_type)}</Text>
                  <Text bold>{address.name.trim() || " "}</Text>
                </View>
              </Ripple>
              {address.default == "1" && <Badge badgeStyle={{ backgroundColor: colors.primary }} value="Default" />}
            </View>

            <View style={{ marginTop: 6, marginLeft: 32, flexDirection: 'row', alignItems: 'flex-end' }}>
              <View style={{ flex: 1 }}>
                <Text p style={{ marginVertical: 1 }}>{address.house_no.trim() || ""} {address.address.trim() || ""} {address.landmark.trim()}</Text>
                <Text p style={{ marginVertical: 1 }}>{address.city.trim() || ""}, {address.state.trim()}, {address.pincode.trim()}</Text>
                <Text p style={{ marginVertical: 1 }}>+91 {address.mobile.trim()}</Text>
              </View>

              <View style={{ flexDirection: 'row', marginHorizontal: -3 }}>
                <View style={{ marginHorizontal: 3 }}>
                  <Button title="Delete" white
                    onPress={() => {
                      setDeleteAddressConfirm({ ...deleteAddressConfirm, show: true, id: address.id });
                    }}
                  />
                </View>
                <View style={{ marginHorizontal: 3 }}>
                  <Button title="Edit" white
                    onPress={() => {
                      setEditAddress({ show: true, "address": address });
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Paper>
      </View>)}





    </>
  )
}


const styles = StyleSheet.create({

  header: {
    backgroundColor: colors.white,
  },

  footerMenu: {
    position: 'absolute', bottom: 20, left: 0, right: 0,
    paddingVertical: 10,
  },


})
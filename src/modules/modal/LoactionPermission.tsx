import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native';
import GetLocation from 'react-native-get-location'

import { colors } from '../../styles';
import MainContainer from '../../components/Containers/Main';
import { Button } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';

import { request, PERMISSIONS } from 'react-native-permissions';


export const LoactionPermission = ({
  setLoactionPermission,
}: {
  setLoactionPermission: (state: boolean) => void;
}) => {


  const [locationPick, setLocationPick] = useState({})

  const requestLocation = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      console.log(result);
      setLoactionPermission(false);
    });
  }

  return (
    <Modal animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MainContainer>
              <Paper>
                <View style={styles.modalData}>

                  <Text hCenter style={{ paddingHorizontal: 10, marginBottom: 20 }} h3 >
                    Location Permission
                </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 10 }}>
                    <Image style={{}}
                      source={require('../../../assets/images/pages/location.png')}
                    />
                  </View>
                  <Text caption hCenter>Please allow to use your location to show nearby restaurant on the map.</Text>




                  <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center', alignItems: 'center' }}>

                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                      <Button title="No Thanks" white lg
                        onPress={() => {
                          setLoactionPermission(false);
                        }}
                      />
                    </View>


                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                      {/* <Button title="Enable" primary lg raised
                    onPress={() => {
                      setLoactionPermission(false);
                    }}
                  /> */}
                      <Button title="Enable" primary lg raised
                        onPress={requestLocation}
                      />
                    </View>



                  </View>

                </View>
              </Paper>
            </MainContainer>
          </View>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalView: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    flex: 1,
    maxWidth: 340,
  },
  modalData: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    position: 'relative',
    backgroundColor: colors.white,
    borderRadius: 10,
  },

});
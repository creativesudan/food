import React from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native';
import { Icon , Divider, Avatar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import { colors } from '../../styles';
import MainContainer from '../../components/Containers/Main';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';

import FloatingInput from '../../components/FloatingInput';
import FormGroup from '../../components/FormGroup';


export const AddAddress = ({
  setAddAddress,
}: {
  setAddAddress: (state: boolean) => void;
}) => (


  // const navigation = useNavigation();

  // return (
  <Modal animationType="slide" transparent>
    <View style={styles.overlay}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MainContainer>
            <Paper>
              <View style={styles.modalData}>

                <View style={{position: 'absolute', top:10, zIndex:1, right:10}}>
                <IconButton
                  white noBorder mdR
                  onPress={() => {
                    setAddAddress(false);
                  }}
                  icon={
                    <Image style={{width:14}} source={require('../../../assets/images/icons/close.png')}/>
                  }
                />
                </View>

                <Text hCenter style={{paddingHorizontal: 10, marginBottom:10}} subtitle2 >
                  Add Delivery Address
                </Text>

                
                  <Ripple style={{ borderRadius:100, overflow: 'hidden'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center',  paddingVertical: 10, paddingHorizontal:15, backgroundColor:"#FFF6F6",}}>
                      <Image
                        style={{ tintColor: colors.primary, }}
                        source={require('../../../assets/images/icons/location.png')}
                      />
                      <Text style={{marginLeft:10}}>11th Ave, Gaur City 2, Ghaziabad</Text>
                      
                    </View>
                  </Ripple>

                  <View style={{flexDirection: 'row', marginTop:10, alignItems: 'center', alignSelf: 'center'}}>
                    <View style={{marginHorizontal:5}}>
                      <Button title="Home" primary md/>
                    </View>
                    <View style={{marginHorizontal:5}}>
                      <Button title="Work" white md/>
                    </View>
                    <View style={{marginHorizontal:5}}>
                      <Button title="Other" white md/>
                    </View>
                  </View>
                
                <View style={{marginVertical:2}}>
                  <FloatingInput
                    attrName="personalName"
                    title="Name"
                    value={""}
                    // onChange={setName}
                  />
                </View>
                
                <View style={{marginVertical:2}}>
                  <FloatingInput
                    attrName="personalName"
                    title="Flat no./Office/House"
                    value={""}
                    // onChange={setName}
                  />
                </View>
                
                <View style={{marginVertical:2}}>
                  <FloatingInput
                    attrName="personalName"
                    title="11th Ave, Gaur City 2,"
                    value={""}
                    // onChange={setName}
                  />
                </View>
                
                <View style={{marginVertical:2}}>
                  <FloatingInput
                    attrName="personalName"
                    title="Landmark"
                    value={""}
                    // onChange={setName}
                  />
                </View>
                
                <View style={{marginVertical:2}}>
                  <FloatingInput
                    attrName="personalName"
                    title="Pin"
                    value={""}
                    // onChange={setName}
                  />
                </View>
                
                <View style={{marginVertical:2}}>
                  <FloatingInput
                    attrName="personalName"
                    title="Mobile"
                    value={""}
                    // onChange={setName}
                  />
                </View>

                <View style={{flexDirection: 'row', marginTop:20, alignSelf: 'center', alignItems: 'center'}}>
                <View style={{width:140, marginHorizontal:5}}>
                  <Button title="Save" primary lg raised
                    onPress={() => {
                      setAddAddress(false);
                    }}
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
);

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
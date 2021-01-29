import React from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native';
import { Icon , Divider, Avatar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import { colors } from '../../styles';
import MainContainer from '../../components/Containers/Main';
import { Button,IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';

import FloatingInput from '../../components/FloatingInput';
import FormGroup from '../../components/FormGroup';


export const DeleteAddressConfirm = ({
  setDeleteAddressConfirm,
}: {
  setDeleteAddressConfirm: (state: boolean) => void;
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
                    setDeleteAddressConfirm(false);
                  }}
                  icon={
                    <Image style={{width:14}} source={require('../../../assets/images/icons/close.png')}/>
                  }
                />
                </View>

                <Text hCenter style={{paddingHorizontal: 10, marginVertical:20}} subtitle2 >
                Are You Sure Want to detele Address
                </Text>


                <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                  
                {/* <View style={{width:100, marginHorizontal:5}}>
                  <Button title="Cancel" grey lg 
                      onPress={() => {
                        setDeleteAddressConfirm(false);
                      }}
                    />
                </View> */}
                <View style={{width:100, marginHorizontal:5}}>
                  <Button title="Delete" primary lg raised
                    onPress={() => {
                      setDeleteAddressConfirm(false);
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
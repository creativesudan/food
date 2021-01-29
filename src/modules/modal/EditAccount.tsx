import React from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native';
import { Icon , Divider, Avatar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import { colors } from '../../styles';
import MainContainer from '../../components/Containers/Main';
import { Button } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';

import FloatingInput from '../../components/FloatingInput';
import FormGroup from '../../components/FormGroup';


export const EditAccount = ({
  setEditAccount,
}: {
  setEditAccount: (state: boolean) => void;
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

                <Text hCenter style={{paddingHorizontal: 10, marginBottom:20}} subtitle2 >
                  Edit Account
                </Text>

                
                <View style={{marginVertical:2}}>
                  <FloatingInput
                    attrName="personalName"
                    title="Name"
                    value={"Jhon Doe"}
                    // onChange={setName}
                  />
                </View>
                
                <View style={{marginVertical:2}}>
                  <FloatingInput
                    attrName="personalName"
                    title="Mobile"
                    value={"9876543210"}
                    // onChange={setName}
                  />
                </View>
                
                <View style={{marginVertical:2}}>
                  <FloatingInput
                    attrName="personalName"
                    title="Email"
                    value={"ashubisht.931@gmail.com"}
                    // onChange={setName}
                  />
                </View>
                

                <View style={{flexDirection: 'row', marginTop:20, alignSelf: 'center', alignItems: 'center'}}>
                  
                <View style={{width:100, marginHorizontal:5}}>
                  <Button title="Cancel" grey lg 
                      onPress={() => {
                        setEditAccount(false);
                      }}
                    />
                </View>
                <View style={{width:100, marginHorizontal:5}}>
                  <Button title="Update" primary lg raised
                    onPress={() => {
                      setEditAccount(false);
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
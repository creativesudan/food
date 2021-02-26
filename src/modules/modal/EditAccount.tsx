import React, { useState } from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native';
import { Icon, Divider, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import { colors } from '../../styles';
import MainContainer from '../../components/Containers/Main';
import { Button } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';

import FloatingInput from '../../components/FloatingInput';
import FormGroup from '../../components/FormGroup';

import { useDispatch, useSelector } from "react-redux";
import { updateField, updateUser as updateUserAction } from "../../redux/actions/auth";




export const EditAccount = ({
  setEditAccount,
}: {
  setEditAccount: (state: boolean) => void;

}) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [updatedUser, updateUser] = useState(user);

  // const navigation = useNavigation();

  return (
    <Modal animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MainContainer>
              <Paper>
                <View style={styles.modalData}>

                  <Text hCenter style={{ paddingHorizontal: 10, marginBottom: 20 }} subtitle2 >
                    Edit Account
                </Text>


                  <View style={{ marginVertical: 2 }}>
                    <FloatingInput
                      attrName="personalName"
                      title="Name"
                      value={updatedUser.name}
                      onChange={(val) => updateUser({ ...updatedUser, name: val })}
                    />
                  </View>

                  <View style={{ marginVertical: 2 }}>
                    <FloatingInput
                      attrName="personalName"
                      title="Mobile"
                      value={updatedUser.mobile}
                      onChange={(val) => updateUser({ ...updatedUser, mobile: val })}
                    />
                  </View>

                  <View style={{ marginVertical: 2 }}>
                    <FloatingInput
                      attrName="personalName"
                      title="Email"
                      value={updatedUser.email}
                      onChange={(val) => updateUser({ ...updatedUser, email: val })}
                    />
                  </View>


                  <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center', alignItems: 'center' }}>

                    <View style={{ width: 100, marginHorizontal: 5 }}>
                      <Button title="Cancel" grey lg
                        onPress={() => {
                          setEditAccount(false);
                        }}
                      />
                    </View>
                    <View style={{ width: 100, marginHorizontal: 5 }}>
                      <Button title="Update" primary lg raised
                        onPress={async () => {
                          await dispatch(updateUserAction(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.mobile));
                          dispatch(updateField("user", updatedUser));
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
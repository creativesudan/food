import React, { useState } from 'react'
import { View, Image, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MainContainer from '../../components/Containers/Main';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import { colors } from '../../styles';

import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth";

export default function OtpView({ navigation }) {
  const [number, onChangeNumber] = useState(null);
  const dispatch = useDispatch();

  return (
    <View style={{ height: '100%', backgroundColor: colors.white }}>
      <ScrollView>
        <View style={{ flexGrow: 1, }}>


          <MainContainer>
            <View style={styles.content}>
              <Text h1 color={colors.primary}>OTP Verification </Text>
              <Text caption style={{ marginTop: 5 }}>Verify your mobile number 9876543210</Text>
            </View>

            <View style={styles.OTPContainer}>
              <View style={styles.OTPBar}>
                <View style={styles.numbers}>
                  <TextInput
                    style={{ paddingHorizontal: 0, fontSize: 20, color: '#9196A9', textAlign: 'center', }}
                    onChangeText={onChangeNumber}
                    value={number}
                    editable={false}
                    placeholder="X"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.numbers}>
                  <TextInput
                    style={{ paddingHorizontal: 0, fontSize: 20, color: '#9196A9', textAlign: 'center', }}
                    onChangeText={onChangeNumber}
                    value={number}
                    editable={false}
                    placeholder="X"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.numbers}>
                  <TextInput
                    style={{ paddingHorizontal: 0, fontSize: 20, color: '#9196A9', textAlign: 'center', }}
                    onChangeText={onChangeNumber}
                    value={number}
                    editable={false}
                    placeholder="X"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.numbers}>
                  <TextInput
                    style={{ paddingHorizontal: 0, fontSize: 20, color: '#9196A9', textAlign: 'center', }}
                    onChangeText={onChangeNumber}
                    value={number}
                    editable={false}
                    placeholder="X"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View>
              <View style={{ marginBottom: 40, marginTop: 30, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <Text hCenter>Didn't received the OTP ? </Text>
                <Button title="Resend" link white />
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                <View style={{ width: 150 }}>
                  <Button lg primary raised title="Verify" onPress={() => { dispatch(login()); navigation.navigate('Home') }} />
                </View>
              </View>
            </View>



          </MainContainer>

        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  abstract: {
    position: 'absolute',
    top: -100,
    left: -100,
  },
  banner: {
    marginTop: 110
  },
  content: {
    alignItems: 'center',
    marginTop: 110,
    marginBottom: 50
  },
  NumberArea: {
    padding: 6,
    borderColor: '#F3E6E6',
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  OTPBar: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  numbers: {
    marginHorizontal: 6,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: '#F3E6E6',
    borderWidth: 1
  },
  OTPContainer: {
    alignItems: 'center',
  },

})
import React, { useState } from 'react'
import { View, Image, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MainContainer from '../../components/Containers/Main';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import { colors } from '../../styles';

import { useDispatch, useSelector } from "react-redux";
import { verify, login } from "../../redux/actions/auth";

export default function OtpView({ navigation }) {
  const mobile = useSelector(state => state.auth.mobile);
  const inProgress = useSelector(state => state.auth.inProgress);
  const dispatch = useDispatch();
  const [otp, changeOtp] = useState(['', '', '', '']);

  const updateOtp = (place, val) => {
    let new_otp = [...otp]
    new_otp[place] = val;
    changeOtp(new_otp);
  }

  return (
    <View style={{ height: '100%', backgroundColor: colors.white }}>
      <ScrollView>
        <View style={{ flexGrow: 1, }}>


          <MainContainer>
            <View style={styles.content}>
              <Text h1 color={colors.primary}>OTP Verification </Text>
              <Text caption style={{ marginTop: 5 }}>Verify your mobile number {mobile}</Text>
            </View>

            <View style={styles.OTPContainer}>
              <View style={styles.OTPBar}>
                <View style={styles.numbers}>
                  <TextInput
                    style={{ paddingHorizontal: 0, fontSize: 20, color: '#9196A9', textAlign: 'center', }}
                    onChangeText={text => updateOtp(0, text)}
                    value={otp[0]}
                    // editable={false}
                    placeholder="X"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.numbers}>
                  <TextInput
                    style={{ paddingHorizontal: 0, fontSize: 20, color: '#9196A9', textAlign: 'center', }}
                    onChangeText={text => updateOtp(1, text)}
                    value={otp[1]}
                    // editable={false}
                    placeholder="X"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.numbers}>
                  <TextInput
                    style={{ paddingHorizontal: 0, fontSize: 20, color: '#9196A9', textAlign: 'center', }}
                    onChangeText={text => updateOtp(2, text)}
                    value={otp[2]}
                    // editable={false}
                    placeholder="X"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.numbers}>
                  <TextInput
                    style={{ paddingHorizontal: 0, fontSize: 20, color: '#9196A9', textAlign: 'center', }}
                    onChangeText={text => updateOtp(3, text)}
                    value={otp[3]}
                    // editable={false}
                    placeholder="X"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View>
              <View style={{ marginBottom: 40, marginTop: 30, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <Text hCenter>Didn't received the OTP ? </Text>
                <Button title="Resend" link white onPress={() => dispatch(login(mobile))} />
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                <View style={{ width: 150 }}>
                  <Button lg primary raised title="Verify" onPress={() => { dispatch(verify(mobile, otp.join(""))); if (!inProgress) navigation.navigate('Home') }} />
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
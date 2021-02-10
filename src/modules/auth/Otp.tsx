import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MainContainer from '../../components/Containers/Main';
import { Button } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import { colors } from '../../styles';

import OTPInputView from '@twotalltotems/react-native-otp-input'

import { useDispatch, useSelector } from "react-redux";
import { verify, login } from "../../redux/actions/auth";

export default function OtpView({ navigation }) {
  const mobile = useSelector(state => state.auth.mobile);
  const inProgress = useSelector(state => state.auth.inProgress);
  const dispatch = useDispatch();
  const [otp, changeOtp] = useState();

  const updateOtp = (val) => {
    let new_otp = otp
    new_otp = val;
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

            <OTPInputView style={{width: 250, height: 50}}
              pinCount={4}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              placeholderTextColor={'#f00'}
              onCodeChanged={text => updateOtp(text)}

              />
            </View>

            <View style={{marginBottom:10}}>
              <View style={{ marginBottom: 40, marginTop: 30, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <Text hCenter>Didn't received the OTP ? </Text>
                <Button title="Resend" link white onPress={() => dispatch(login(mobile))} />
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                <View style={{ width: 150 }}>
                  <Button lg primary raised title="Verify" onPress={() => { dispatch(verify(mobile, otp)); if (!inProgress) navigation.navigate('Home') }} />
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

  borderStyleHighLighted: {
    borderColor: '#F3E6E6',
  },
  underlineStyleBase: {
    borderRadius:100, 
    color:colors.black,
    fontSize: 20,
  },
  underlineStyleHighLighted: {
    borderColor: colors.primary,
  },
  content: {
    alignItems: 'center',
    marginTop: 110,
    marginBottom: 50
  },
  OTPContainer: {
    alignItems: 'center',
  },

})
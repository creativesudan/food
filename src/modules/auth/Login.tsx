import React, { useState } from 'react'
import { View, Image, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MainContainer from '../../components/Containers/Main';
import { IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import { colors } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { login, updateField } from '../../redux/actions/auth';


export default function Login({ navigation }) {
  const mobile = useSelector(state => state.auth.mobile);
  const dispatch = useDispatch();

  return (
    <View style={{ height: '100%', backgroundColor: colors.white }}>
      <ScrollView>
        <View style={{ flexGrow: 1, }}>
          <Image
            style={styles.abstract}
            source={require('../../../assets/images/pages/login.png')}
          />

          <View style={styles.banner}>
            <Image
              source={require('../../../assets/images/pages/login_bg.png')}
            />
          </View>

          <MainContainer>
            <View style={styles.content}>
              <Text h1>Delivering Tasty Sweets </Text>
              <Text subtitle1 style={{ marginTop: 5 }}>for you in minutes</Text>
              <Text caption style={{ marginTop: 15, }}>Order your favourite food from your app</Text>
            </View>

            <View style={styles.NumberArea}>
              <View style={{ width: 60, paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 24, color: colors.primary }}>+91</Text>
              </View>
              <View style={{ flex: 1, position: 'relative' }} >
                <View style={{ position: 'absolute', top: -16, left: -10, backgroundColor: colors.white, paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 12 }}>Enter your mobile number to sign in</Text>
                </View>
                <View>

                  <TextInput
                    style={{ paddingHorizontal: 0, fontSize: 16 }}
                    onChangeText={text => dispatch(updateField('mobile', text))}
                    value={mobile}
                    placeholder="Your Number"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View>

                {mobile.length == 10 ? (
                  <IconButton
                    onPress={() => {
                      dispatch(login(mobile));
                      navigation.navigate('Otp');
                    }}
                    primary lgR raised
                    icon={
                      <Image style={{ width: 16, height: 16 }}
                        source={require('../../../assets/images/icons/next.png')}
                      />
                    }
                  />
                ) :
                  (
                    <IconButton
                      onPress={() => navigation.navigate('Otp')}
                      primary lgR disabled
                      icon={
                        <Image style={{ width: 16, height: 16 }}
                          source={require('../../../assets/images/icons/next.png')}
                        />
                      }
                    />
                  )
                }



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
    marginTop: 70,
    marginBottom: 50
  },
  NumberArea: {
    padding: 6,
    borderColor: '#F3E6E6',
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
  }
})
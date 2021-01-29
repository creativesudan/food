import React from 'react';
import { StyleSheet, View, Modal, Image,TextInput } from 'react-native';
import { Icon , Divider, Avatar, ListItem} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import { colors } from '../../styles';
import MainContainer from '../../components/Containers/Main';
import { Button } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';

import FloatingInput from '../../components/FloatingInput';
import FormGroup from '../../components/FormGroup';


export const ReviewRate = ({
  setReviewRate,
}: {
  setReviewRate: (state: boolean) => void;
}) => (


  // const navigation = useNavigation();

  // return (
  <Modal animationType="slide" transparent>
    <View style={styles.overlay}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MainContainer>
            <Paper>

              <View style={{backgroundColor: colors.primary, borderTopLeftRadius:5, borderTopRightRadius:5}}>
                <Text hCenter color={colors.white} style={{marginVertical:10}} subtitle2 >
                  12 Sep, 2020, 08:32 PM
                </Text>
              </View>

              <View style={styles.modalData}>


                  <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
                    <ListItem.Content>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{width: 12, height:12,}}
                          source={require('../../../assets/images/icons/veg.png')}
                        />
                        <Text caption style={{marginLeft:10}} >Nut Butter Dream Bars X2</Text>
                      </View>
                    </ListItem.Content>
                    <Text caption>Rs. 270 Kg</Text>
                  </ListItem>

                  <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
                    <ListItem.Content>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{width: 12, height:12,}}
                          source={require('../../../assets/images/icons/veg.png')}
                        />
                        <Text caption style={{marginLeft:10}} >Low-Sugar Snacks X1</Text>
                      </View>
                    </ListItem.Content>
                    <Text caption>130 Kg</Text>
                  </ListItem>

                  <View style={{marginVertical:15}}>
                      <Text hCenter>Kindly Rate your experience</Text>

                      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop:10}}>
                        <Image style={{width:34,height:34}}
                          source={require('../../../assets/images/icons/yummy.png')}/>
                      </View>

                      <Text hCenter color={colors.primary} style={{marginTop:5}}>Yummy</Text>

                      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop:10}}>
                        <View style={{marginHorizontal:10}}>
                          <Ripple style={{borderRadius:100, overflow: 'hidden', position:'relative'}}>
                            <Image style={{width:24,height:24,}}
                              source={require('../../../assets/images/icons/angry_fade.png')}
                            />
                          </Ripple>
                        </View>
                        <View style={{marginHorizontal:10}}>
                          <Ripple style={{borderRadius:100, overflow: 'hidden', position:'relative'}}>
                            <Image style={{width:24,height:24}}
                              source={require('../../../assets/images/icons/neutral_fade.png')}
                            />
                          </Ripple>
                        </View>
                        <View style={{marginHorizontal:10}}>
                          <Ripple style={{borderRadius:100, overflow: 'hidden', position:'relative'}}>
                            <Image style={{width:24,height:24}}
                              source={require('../../../assets/images/icons/smile_fade.png')}
                            />
                          </Ripple>
                        </View>
                        <View style={{marginHorizontal:10}}>
                          <Ripple style={{borderRadius:100, overflow: 'hidden'}}>
                            <Image style={{width:24,height:24}}
                              source={require('../../../assets/images/icons/yummy.png')}
                            />
                          </Ripple>
                        </View>
                      </View>
                      
                      <Text hCenter style={{marginVertical:10}}>Do you have any feedback</Text>

                      <TextInput
                        style={{backgroundColor: '#FFF6F6', borderRadius:100, paddingHorizontal:10}}
                        // onChangeText={onChangeNumber}
                        value={''}
                        placeholder="Enter Feedback"
                        keyboardType="default"
                      />
                      
                     
                  </View>
                                     

                <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                  
                <View style={{flex:1, marginHorizontal:5}}>
                  <Button title="Later" white lg 
                      onPress={() => {
                        setReviewRate(false);
                      }}
                    />
                </View>
                <View style={{flex:1, marginHorizontal:5}}>
                  <Button title="Submit" primary lg raised
                    onPress={() => {
                      setReviewRate(false);
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
import React, { useState, useCallback, useRef } from "react";
import {View, StyleSheet,Image,Dimensions, SafeAreaView,TextInput } from 'react-native';
import Ripple from 'react-native-material-ripple';

import MainContainer from '../../components/Containers/Main';
import { SearchBar, Avatar, Icon, Badge, withBadge, ListItem, CheckBox, Divider} from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from "react-native-gesture-handler";
import { AddAddress } from "../modal/AddAddress";
import { EditAddress } from "../modal/EditAddress";
import { color } from "react-native-reanimated";



export default function OrderDetailView({navigation}) {
  const [number, onChangeNumber] = React.useState(null);

  return (
    <>
   
    
    <ScrollView>
    <MainContainer>
      <View style={{marginBottom:80, marginTop:20}}>


        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:5}}>
          <Text h4 bold style={{flex:1}}>Order Details</Text>
          <Badge badgeStyle={{backgroundColor: '#63D8A5'}} value="Delivered"/>
        </View>

        <Paper style={{marginVertical:5}}>
          <View style={{padding:10}}>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <Text caption>Delivery to :</Text>
              </ListItem.Content>
              <Text>11th Ave, Gaur City 2</Text>
            </ListItem>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <Text caption>Date & time :</Text>
              </ListItem.Content>
              <Text>12 Sep, 2020, 08:32 PM</Text>
            </ListItem>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <Text caption>Payment Mode :</Text>
              </ListItem.Content>
              <Text>Credit Card</Text>
            </ListItem>
          </View>
        </Paper>

        <Paper style={{marginVertical:5}}>
          <View style={{padding:10}}>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image style={{width: 12, height:12,}}
                    source={require('../../../assets/images/icons/veg.png')}
                  />
                  <Text style={{marginLeft:10}} >Nut Butter Dream Bars X2</Text>
                </View>
              </ListItem.Content>        

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{ marginRight:4}}
                source={require('../../../assets/images/icons/rupee.png')}
              />
              <Text style={{marginLeft:2}}color={colors.primary}>270 Kg</Text>
            </View>
            </ListItem>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image style={{width: 12, height:12,}}
                    source={require('../../../assets/images/icons/veg.png')}
                  />
                  <Text style={{marginLeft:10}} >Low-Sugar Snacks X1</Text>
                </View>
              </ListItem.Content>             

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{ marginRight:4}}
                  source={require('../../../assets/images/icons/rupee.png')}
                />
                <Text style={{marginLeft:2}}color={colors.primary}>130 Kg</Text>
              </View>
            </ListItem>
          </View>
        </Paper>

        <View style={{marginVertical:5}}>
          <View style={{paddingHorizontal:10}}>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <Text caption>Sub Total</Text>
              </ListItem.Content>                                          
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{ marginRight:4}}
                  source={require('../../../assets/images/icons/rupee.png')}
                />
                <Text style={{marginLeft:2, width:50}}>750.00</Text>
              </View>
            </ListItem>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <Text caption>Discount</Text>
              </ListItem.Content>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{ marginRight:4}}
                  source={require('../../../assets/images/icons/rupee.png')}
                />
                <Text style={{marginLeft:2, width:50}}>80.00</Text>
              </View>

            </ListItem>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <Text bold>Total Amount</Text>
              </ListItem.Content>              
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{ marginRight:4}}
                  source={require('../../../assets/images/icons/rupee.png')}
                />
                <Text style={{marginLeft:2, width:50}} bold color={'#404355'}>620.00</Text>
              </View>
            </ListItem>
          </View>
        </View>

      </View>
    </MainContainer>
    
    
    </ScrollView>

    
    <View style={styles.footerMenu}>
      <MainContainer>
        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginHorizontal:-10}}>
          <View style={{flex:1, marginHorizontal:10}}><Button title="Contact" raised lg secondary/></View>
          <View style={{flex:1, marginHorizontal:10}}><Button  onPress={() => navigation.navigate('Cart')} title="Repeat" raised lg primary/></View>
        </View>
      </MainContainer>
    </View>  

    </>
  )
}


const styles = StyleSheet.create({

label:{
  marginTop: 4
},
footerMenu:{
  position: 'absolute', bottom: 0, left:0, right:0,
  paddingVertical:15,
},


})
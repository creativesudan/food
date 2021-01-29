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



export default function OrderListView({navigation}) {
  const [number, onChangeNumber] = React.useState(null);

  return (
    <>
   
    
    <ScrollView>
    <MainContainer>
      <View style={{marginVertical:20}}>

      
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text h4 bold style={{flex:1}}>Current</Text>
          <Text style={{fontSize:12, color:'#5D6275'}}>Today, 26th Sep, 06:54 PM</Text>
        </View>

        <Paper style={{marginVertical:5}}>
          <View style={{padding:10, flexDirection: 'row', alignItems: 'center'}}>
            <Text subtitle2 style={{flex:1}}>ID : #70111-34676</Text>
            <Badge badgeStyle={{backgroundColor: '#5D6275'}} value="Processing"/>
          </View>
          
          <View style={{paddingHorizontal:10}}>
            <View style={{marginBottom:5}}>
              <Text caption>Address</Text>
              <Text>11th Ave, Gaur City 2, Ghaziabad</Text>
            </View>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image style={{width: 12, height:12,}}
                    source={require('../../../assets/images/icons/veg.png')}
                  />
                  <Text style={{marginLeft:10}} >Nut Butter Dream Bars X2</Text>
                </View>
              </ListItem.Content>
              
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
                <Text style={{marginLeft:2}} h4 bold color={'#404355'}>620.00</Text>
              </View>

            </ListItem>
          </View>
          
          <Divider style={{marginTop:6, borderWidth:0.5, borderColor:'#F9C5C5', borderRadius:20, borderStyle: 'dashed'}}/>
          <Button title="Cancel Order " flat md white noBorder            
            icon={
              <Image
                style={{ tintColor: colors.primary, marginRight: 10, width:10 }}
                source={require('../../../assets/images/icons/close.png')}
              />
            }
          />

        </Paper>

        
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
          <Text h4 bold style={{flex:1}}>Past</Text>
          <Text style={{fontSize:12, color:'#5D6275'}}>12 Sep, 2020, 08:32 PM</Text>
        </View>

        <Paper style={{marginVertical:5}}>
          <Ripple onPress={() => navigation.navigate('Order Detail')}>
          <View style={{padding:10, flexDirection: 'row', alignItems: 'center'}}>
            <Text subtitle2 style={{flex:1}}>ID : #70111-34676</Text>
            <Badge badgeStyle={{backgroundColor: '#63D8A5'}} value="Delivered"/>
          </View>
          
          <View style={{paddingHorizontal:10, marginBottom:10}}>
            <View style={{marginBottom:5}}>
              <Text caption>Address</Text>
              <Text>11th Ave, Gaur City 2, Ghaziabad</Text>
            </View>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image style={{width: 12, height:12,}}
                    source={require('../../../assets/images/icons/veg.png')}
                  />
                  <Text style={{marginLeft:10}} >Nut Butter Dream Bars X2</Text>
                </View>
              </ListItem.Content>
              
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
                <Text style={{marginLeft:2}} h4 bold color={'#404355'}>620.00</Text>
              </View>

            </ListItem>
          </View>
          </Ripple>
        </Paper>

    
        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop:20}}>
          <Text style={{fontSize:12, color:'#5D6275'}}>9 Sep, 2020, 07:44 PM</Text>
        </View>

        <Paper style={{marginVertical:5}}>
          <Ripple onPress={() => navigation.navigate('Order Detail')}>
            <View style={{padding:10, flexDirection: 'row', alignItems: 'center'}}>
              <Text subtitle2 style={{flex:1}}>ID : #70111-34676</Text>
              <Badge badgeStyle={{backgroundColor: colors.primary}} value="Cancelled"/>
            </View>
            
            <View style={{paddingHorizontal:10, marginBottom:10}}>
              <View style={{marginBottom:5}}>
                <Text caption>Address</Text>
                <Text>11th Ave, Gaur City 2, Ghaziabad</Text>
              </View>
              <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
                <ListItem.Content>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 12, height:12,}}
                      source={require('../../../assets/images/icons/veg.png')}
                    />
                    <Text style={{marginLeft:10}} >Nut Butter Dream Bars X2</Text>
                  </View>
                </ListItem.Content>
                
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
                <Text style={{marginLeft:2}} h4 bold color={'#404355'}>620.00</Text>
              </View>
              </ListItem>
            </View>
          </Ripple>
        </Paper>
    

      </View>
    </MainContainer>
    
    
    </ScrollView>

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
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


const item = [
  {id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295},
  {id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295},
]


const data = [
  {id: 'b', label: 'Sweets', image: require('../../../assets/images/server_icons/sweets.png')},
  {id: 'c', label: 'Cakes', image: require('../../../assets/images/server_icons/cake.png')},
  {id: 'd', label: 'Namken', image: require('../../../assets/images/server_icons/namkeen.png')},
  {id: 'e', label: 'Biscuits', image: require('../../../assets/images/server_icons/biscuits.png')},
  {id: 'f', label: 'Others', image: require('../../../assets/images/server_icons/ice-cream.png')},
];


export default function PaymentView({navigation}) {
  const [number, onChangeNumber] = React.useState(null);
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  return (
    <>
    
    {addAddress && <AddAddress setAddAddress={setAddAddress} />}
    {editAddress && <EditAddress setEditAddress={setEditAddress} />}
    
    <ScrollView>
    <MainContainer>
      <View style={{marginBottom:80}}>
      <View style={{marginVertical:12}}>
        <Text style={{marginBottom: 5,}}>Select your method of payment</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{ tintColor: '#12B407' }}
            source={require('../../../assets/images/icons/tick.png')}
          />
          <Text caption style={{marginLeft:5}}>100% Secure Payment</Text>
        </View>
      </View>

      <Paper>
        <View style={{ paddingHorizontal:10,  marginVertical:16,}}>
          <View style={{flexDirection: 'row',}}>
            <View style={{marginRight:10}}>
              <Image
                style={{ tintColor: colors.primary }}
                source={require('../../../assets/images/icons/wallet.png')}
              />
            </View>
            <View style={{flex:1}}>
              <Text h5>Credit Card</Text>
              <Text p>Pay from your previously saved cards</Text>
            </View>
            <View>
              <Image
                  style={{ tintColor: colors.primary }}
                  source={require('../../../assets/images/icons/expand_more.png')}
                />
            </View>
          </View>
        
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop:10}}>
            <Image source={require('../../../assets/images/icons/mastercard.png')} />
            <Text style={{marginLeft:10, flex:1}}>5172 XXXX XXXX 4728</Text>

            <View style={{
              borderColor:'#F3E6E6', borderWidth:1,
              flexDirection: 'row', backgroundColor: colors.white, borderRadius:100, alignItems: 'center'}}>
              <View style={{ paddingHorizontal: 30}}>
              <TextInput
                style={{height: 37}}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="CVV"
                keyboardType="numeric"
              /></View>
            </View>

          </View>
        </View>
      </Paper>
      
      <View style={{marginVertical:10}}>
        <Paper>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical:12, paddingHorizontal:10}}>
            <Text style={{flex:1}}>Add Debit / Credit</Text>
            <View style={{marginHorizontal:5}}><Image source={require('../../../assets/images/icons/visa.png')} /></View>
            <View style={{marginHorizontal:5}}><Image source={require('../../../assets/images/icons/mastercard.png')} /></View>
            <View style={{marginHorizontal:5}}><Image source={require('../../../assets/images/icons/aexpress.png')} /></View>
            <View>
              <Image source={require('../../../assets/images/icons/expand_more.png')} />
            </View>
          </View>
        </Paper>
      </View>
      
      <Ripple style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginTop:10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', width:22, height:22, borderWidth:1, borderColor:'#F9C5C5', borderRadius:100}}>
            <View style={{marginLeft:6, flexDirection: 'row', width:8, height:8, backgroundColor: colors.primary, borderRadius:10}}></View>
        </View>
        <Text style={{marginLeft:10}}>Cash On Delivery</Text>
      </Ripple>
      
      <View style={{marginVertical:5}}>
        <Text>Wallet</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: -12}}>
          <Ripple style={{paddingHorizontal:12, flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width:22, height:22, borderWidth:1, borderColor:'#F9C5C5', borderRadius:100}}>
                <View style={{marginLeft:6, flexDirection: 'row', width:8, height:8, backgroundColor: '#F3E6E6', borderRadius:10}}></View>
            </View>
            <View style={{marginLeft:10}}>
              <Image source={require('../../../assets/images/icons/paytm.png')} />
            </View>
          </Ripple>
          
          <Ripple style={{paddingHorizontal:12,flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width:22, height:22, borderWidth:1, borderColor:'#F9C5C5', borderRadius:100}}>
                <View style={{marginLeft:6, flexDirection: 'row', width:8, height:8, backgroundColor: '#F3E6E6', borderRadius:10}}></View>
            </View>
            <View style={{marginLeft:10}}>
              <Image source={require('../../../assets/images/icons/phone_pe.png')} />
            </View>
          </Ripple>
        </View>
      </View>
      
      <Divider style={{marginVertical:5}} />

      <View style={{marginVertical:5}}>
        <Text >UPI</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: -12}}>
          <Ripple style={{paddingHorizontal:12, flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width:22, height:22, borderWidth:1, borderColor:'#F9C5C5', borderRadius:100}}>
                <View style={{marginLeft:6, flexDirection: 'row', width:8, height:8, backgroundColor: '#F3E6E6', borderRadius:10}}></View>
            </View>
            <View style={{marginLeft:10}}>
              <Image source={require('../../../assets/images/icons/paytm.png')} />
            </View>
          </Ripple>
          
          <Ripple style={{paddingHorizontal:12,flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width:22, height:22, borderWidth:1, borderColor:'#F9C5C5', borderRadius:100}}>
                <View style={{marginLeft:6, flexDirection: 'row', width:8, height:8, backgroundColor: '#F3E6E6', borderRadius:10}}></View>
            </View>
            <View style={{marginLeft:10}}>
              <Image source={require('../../../assets/images/icons/phone_pe.png')} />
            </View>
          </Ripple>
          
          <Ripple style={{paddingHorizontal:12,flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
            <View style={{flexDirection: 'row', alignItems: 'center', width:22, height:22, borderWidth:1, borderColor:'#F9C5C5', borderRadius:100}}>
                <View style={{marginLeft:6, flexDirection: 'row', width:8, height:8, backgroundColor: '#F3E6E6', borderRadius:10}}></View>
            </View>
            <View style={{marginLeft:10}}>
              <Image source={require('../../../assets/images/icons/gpay.png')} />
            </View>
          </Ripple>
        </View>
      </View>
      
      <View style={{marginVertical:5}}>
        <Text>Net Banking</Text>
        
        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: -20, marginTop:15}}>
          <View style={{marginHorizontal:20, flexDirection: 'column', alignSelf: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/images/server_icons/hdfc.png')} />
            <Text style={{marginTop:10}}>HDFC</Text>
          </View>
          <View style={{marginHorizontal:20, flexDirection: 'column', alignSelf: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/images/server_icons/icici.png')} />
            <Text style={{marginTop:10}}>ICICI</Text>
          </View>
          <View style={{marginHorizontal:20, flexDirection: 'column', alignSelf: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/images/server_icons/sbi.png')} />
            <Text style={{marginTop:10}}>SBI</Text>
          </View>
          <View style={{marginHorizontal:20, flexDirection: 'column', alignSelf: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/images/server_icons/axis.png')} />
            <Text style={{marginTop:10}}>AXIS</Text>
          </View>
          <View style={{marginHorizontal:20, flexDirection: 'column', alignSelf: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/images/server_icons/citi.png')} />
            <Text style={{marginTop:10}}>CITI</Text>
          </View>
        </View>

      </View>
      
      <Divider style={{marginVertical:5}} />
      
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop:10}}>
        <Text h5 style={{flex:1}}>More Banks</Text>
        <Image source={require('../../../assets/images/icons/down.png')} />
      </View>

      </View>
    </MainContainer>
    
    
    </ScrollView>

    
    <View style={styles.footerMenu}>
      <MainContainer>
        <Ripple onPress={() => navigation.navigate('Order Summary')} style={{ borderRadius:100, overflow: 'hidden'}}>
          <View style={{position: 'relative', backgroundColor:colors.secondary}}>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', 
            paddingVertical: 10, height:50, paddingHorizontal:20,}}>
              
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text title style={{marginRight:10}}>Pay</Text>
                <Image style={{height:14, width:10, tintColor:'#404355', marginRight:4}}
                    source={require('../../../assets/images/icons/rupee.png')}
                  />
                <Text h3 style={{textAlign: 'right'}}>450</Text>
              </View>
              
            </View>

            <View style={{position: 'absolute', right:20, top:18}}><Image source={require('../../../assets/images/icons/right.png')} style={{tintColor:'#404355'}}/></View>
          </View>

        </Ripple>
      </MainContainer>
    </View>  

    </>
  )
}


const styles = StyleSheet.create({
header:{
  backgroundColor: colors.primary
},

label:{
  marginTop: 4
},
footerMenu:{
  position: 'absolute', bottom: 0, left:0, right:0,
  backgroundColor: colors.white,
  shadowColor: '#000',
  shadowOffset: { width: 4, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
  paddingVertical:10,
},


})
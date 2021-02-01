import React, { useState, useCallback, useRef } from "react";
import {View, StyleSheet,Image,Dimensions, SafeAreaView,TextInput } from 'react-native';
import Ripple from 'react-native-material-ripple';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import RBSheet from 'react-native-raw-bottom-sheet';
import MainContainer from '../../components/Containers/Main';
import { SearchBar, Avatar, Icon, Badge, withBadge, ListItem,Divider ,CheckBox} from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from "react-native-gesture-handler";
import { AddAddress } from "../modal/AddAddress";
import { EditAddress } from "../modal/EditAddress";


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


export default function CartView({navigation}) {
  const [number, onChangeNumber] = React.useState(null);
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  
const [qty, setQty] = useState(0);

const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 
const showDatePicker = () => {
  setDatePickerVisibility(true);
};

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
  console.warn("A date has been picked: ", date);
  hideDatePicker();
};
const AssetsDrawer = useRef<RBSheet>(null);

  return (
    <>
    
    <RBSheet
        ref={AssetsDrawer}
        animationType="slide"
        dragFromTopOnly
        closeOnDragDown
        closeOnPressMask
        openDuration={100}
        customStyles={{
          wrapper: {},
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: 'auto',
            // maxHeight: 420,
          },
          draggableIcon: {},
        }}
      >
      <View style={{position: 'absolute', top:10, zIndex:1, right:10}}>
      <IconButton
        white noBorder mdR
        onPress={() => {
          AssetsDrawer.current?.close()
        }}
        icon={
          <Image style={{width:14}} source={require('../../../assets/images/icons/close.png')}/>
        }
      />
      </View>
        <MainContainer>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <View style={{flex:1}}>
            <Text h3>Special Laddoo</Text>
            <Text p color={colors.grey2}>Special Laddoo</Text>
          </View>
        </View>
        <Divider style={{marginVertical:10}}/>
          <View>
            <Text h3>Select Your Quantity</Text>
            <Text p color={colors.grey2}>Please select any one option</Text>
          </View>
          
          <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:10, backgroundColor: 'transparent'}}>
            <ListItem.Content>
              <Text >250 Gram</Text>
            </ListItem.Content>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                containerStyle={{ marginRight: 0, marginVertical:0, padding:0, }}
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={colors.primary}
                checked={true}
              />
            </View>
            
          </ListItem>
          
          <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:5, backgroundColor: 'transparent'}}>
            <ListItem.Content>
              <Text>250 Gram</Text>
            </ListItem.Content>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{height:10, marginRight:4}}
                  source={require('../../../assets/images/icons/rupee.png')}
                />
              <Text >500.00</Text>
              <CheckBox
                containerStyle={{ marginRight: 0, marginVertical:0, padding:0, }}
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={colors.primary}
                // checked={this.state.checked}
              />
            </View>
          </ListItem>
          
          <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:5, backgroundColor: 'transparent'}}>
            <ListItem.Content>
              <Text >1 Kg</Text>
            </ListItem.Content>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{height:10, marginRight:4}}
                  source={require('../../../assets/images/icons/rupee.png')}
                />
              <Text >397.00</Text>
              <CheckBox
                containerStyle={{ marginRight: 0, marginVertical:0, padding:0, }}
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={colors.primary}
                // checked={this.state.checked}
              />
            </View>
          </ListItem>

          <View style={{flexDirection:'row', alignItems: 'center', marginVertical:15}}>
            
            <View>
              <View style={{ width:100, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary,borderRadius: 100}}>
              <IconButton
                white noBorder mdR
                onPress={() => {
                  setQty(qty <=0 ? 0: qty-1);
                }}
                icon={ <Image source={require('../../../assets/images/icons/minus.png')}/>}
              />
              
              <Text hCenter style={{flex:1, fontSize: 14}}>{qty <= 0 ? 'Add'  : qty}</Text>
              <IconButton
                white noBorder mdR
                onPress={() => {
                  setQty(qty+1);
                  AssetsDrawer.current?.open();
                }}
                icon={
                  <Image source={require('../../../assets/images/icons/plus.png')}/>
                }
              />
            </View>
          </View>
            <View style={{flex:1, paddingLeft:10}}>
                <Button title="Add 133" md  primary
                onPress={() => {
                  AssetsDrawer.current?.close();
                }}
                />
            </View>
        </View>

        </MainContainer>
          
      </RBSheet>

    {addAddress && <AddAddress setAddAddress={setAddAddress} />}
    {editAddress && <EditAddress setEditAddress={setEditAddress} />}
    
    <View style={styles.header}>
      <MainContainer>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
            <IconButton
                primary noBorder mdR
                onPress={() => navigation.goBack()}
                icon={
                    <Image 
                    style={{width:16, height:16, tintColor:colors.white}}
                    source={require('../../../assets/images/icons/back.png')}
                    />
                }
              />
          </View>
          <View style={{flex:1, marginLeft:10}}>
            <Text h4 color={colors.white}>My Cart</Text>
            <Text p color={colors.white}>2 items</Text>
          </View>

          <View>
            <Text p bold style={{textAlign: 'right'}} color={colors.white}>Free Delivery</Text>
            <Text p color={colors.white}>with min order 400</Text>
          </View>
          
        </View>


        <View style={{marginVertical: 10}}>
          <Paper>
            <SearchBar
              placeholder="Search product (eg. rasgulla)"
              lightTheme
              // value={searchQuery}
              containerStyle={{
                backgroundColor: 'transparent',
                padding: 0,
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
              }}
              inputContainerStyle={{
                backgroundColor: colors.white,
                height: 38, padding:0,margin:0,
                
              }}
              inputStyle={{
                fontSize: 14,
                paddingLeft: 0,
                marginLeft: 5,
              }}
              leftIconContainerStyle={{
                paddingRight: 0,
              }}
              />
          </Paper>
        </View>

      </MainContainer>
      
    </View>
    
    <ScrollView>
    <MainContainer>
      
      
      <Text style={{marginBottom: 5, marginTop: 15}}>Delivery Address</Text>
      <View style={{backgroundColor:'#F3E6E6', padding: 10, marginBottom:10, borderRadius:5}}>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, paddingLeft:20}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex:1}}>
                <Text color={colors.primary}>Home</Text>

                <View style={{flexDirection: 'row', marginLeft:-16, alignItems: 'center'}}>
                  <Image
                    style={{ tintColor: colors.primary }}
                    source={require('../../../assets/images/icons/tick.png')}
                  />
                  <Text subtitle2 style={{marginLeft:5}}>Jhon Doe</Text>
                </View>
        
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', marginRight:-5}}>
                <Badge badgeStyle={{backgroundColor: colors.primary}} value="Default"/>

                <IconButton transparent noBorder md
                  onPress={() => {
                    setEditAddress(true);
                  }}
                  
                  icon={
                    <Image
                      style={{ tintColor: '#5D6275' }}
                      source={require('../../../assets/images/icons/edit.png')}
                    />
                  }
                />
              </View>
                      
            </View>
            
            <Text>11th Ave, Gaur City 2, Ghaziabad</Text>
            <Text>Pin - 234321</Text>
            <Text>+91 9876543210</Text>
            
            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal:-5}}>
              <View style={{flex:1}}>
                <View style={{flexDirection: 'row'}}>
                  <Ripple onPress={() => navigation.navigate('Manage Address')} style={{flexDirection: 'row', padding:5, alignItems: 'center',}}>
                    <Text style={{marginRight:5, color:colors.primary}}>Choose Address</Text> 
                    <Image style={{marginTop:3}} source={require('../../../assets/images/icons/down.png')}/>
                  </Ripple>
                </View>
              </View>

              <Ripple style={{flexDirection: 'row', padding:5, alignItems: 'center',}}
               onPress={() => {
                setAddAddress(true);
              }}
              >
                <Text style={{marginRight:10, color:colors.primary}}>Add</Text> 
                <Image style={{width: 12, height:12,}}
                  source={require('../../../assets/images/icons/plus.png')}
                />
              </Ripple>
            </View>
          </View>

          {/* <View style={{flexDirection: 'column', alignItems: 'center', paddingLeft:10, marginLeft:10, borderColor:'#E4D4D4', borderLeftWidth: 1}}>
              <Image style={{}}
                source={require('../../../assets/images/icons/clock.png')}
              />
            <View style={{marginVertical:10, alignItems: 'center'}}>
              <Text caption>Delivery Time</Text>
              <Text h4>30 Min</Text>
            </View>
            <Button sm white title="Choose time"  onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View> */}

        </View>
            
      </View>
    </MainContainer>
    
    
    <MainContainer>  
      <View style={{marginBottom:90}}>
      {item.map(item => ( 
      <View style={{marginVertical: 5}}>
        <Paper>              
          <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 78, height:78, borderRadius: 5}}
              source={require('../../../assets/images/mock_data/banner_1.png')}
            />
            <View style={{flex:1, paddingLeft: 16}}>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Image style={{width: 12, height:12,}}
                  source={require('../../../assets/images/icons/veg.png')}
                />
                <Text style={{marginLeft:6}}>Nut Butter Dream Bars</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{height:10, marginRight:4}}
                  source={require('../../../assets/images/icons/rupee.png')}
                />
                  <Text color={colors.primary}>270 Kg</Text>
                  <Text style={{marginLeft: 10, textDecorationLine: 'line-through'}}>295 Kg</Text>
                </View>
                <View style={{width:100}}>
                <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary,borderRadius: 100}}>
                  <IconButton
                    white noBorder mdR
                    onPress={() => {
                      setQty(qty <=0 ? 0: qty-1);
                    }}
                    icon={ <Image source={require('../../../assets/images/icons/minus.png')}/>}
                  />
                  
                  <Text hCenter style={{flex:1, fontSize: 14}}>{qty <= 0 ? 'Add'  : qty}</Text>
                  <IconButton
                    white noBorder mdR
                    onPress={() => {
                      setQty(qty == 0 ? 0 : qty);
                      AssetsDrawer.current?.open()
                    }}
                    icon={
                      <Image source={require('../../../assets/images/icons/plus.png')}/>
                    }
                  />
                </View>
                </View>
              </View>
              
            </View>
          </View>    
        </Paper>
      </View>
      ))}

      <View style={{
         shadowColor: '#000',
         shadowOffset: { width: 4, height: 1 },
         shadowOpacity: 0.2,
         shadowRadius: 1.41,
         elevation: 2,
        flexDirection: 'row', marginTop:10, backgroundColor: colors.white, borderRadius:100, alignItems: 'center'}}>
        <View style={{flex:1, paddingLeft: 10,}}>
        <TextInput
          style={{height: 37}}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Promo Code"
          keyboardType="numeric"
        /></View>
        <View style={{width:100}}><Button title="Apply" md disable/></View>
      </View>
      
      <View style={{marginTop:20}}>
        <Text subtitle2 >Payment Details</Text>

<ListItem bottomDivider containerStyle={{paddingHorizontal:0, paddingVertical:10, backgroundColor: 'transparent'}}>
  <ListItem.Content>
    <Text caption>Sub Total</Text>
  </ListItem.Content>
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Image style={{height:10, marginRight:4}}
        source={require('../../../assets/images/icons/rupee.png')}
      />
    <Text >750.00</Text>
  </View>
</ListItem>

<ListItem bottomDivider containerStyle={{paddingHorizontal:0, paddingVertical:10, backgroundColor: 'transparent'}}>
  <ListItem.Content>
    <Text caption>Discount</Text>
  </ListItem.Content>
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Image style={{height:10, marginRight:4}}
        source={require('../../../assets/images/icons/rupee.png')}
      />
    <Text >80.00</Text>
  </View>
</ListItem>

<ListItem bottomDivider containerStyle={{paddingHorizontal:0, paddingVertical:10, backgroundColor: 'transparent'}}>
  <ListItem.Content>
    <Text caption>Delivery</Text>
  </ListItem.Content>
  <Text color={colors.primary}>Free</Text>
</ListItem>

<ListItem bottomDivider containerStyle={{paddingHorizontal:0, paddingVertical:10, backgroundColor: 'transparent'}}>
  <ListItem.Content>
    <Text caption>Coupon</Text>
  </ListItem.Content>
  <Text >Happy50</Text>
</ListItem>

<ListItem containerStyle={{paddingHorizontal:0, paddingVertical:10, backgroundColor: 'transparent'}}>
  <ListItem.Content>
    <Text subtitle2>Total Amount</Text>
  </ListItem.Content>
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Image style={{height:10, marginRight:4}}
        source={require('../../../assets/images/icons/rupee.png')}
      />
    <Text subtitle2>620.00</Text>
  </View>
</ListItem>
        
      </View>

    </View>
    </MainContainer>
    </ScrollView>

    
    <View style={styles.footerMenu}>
      <MainContainer>
        <Ripple onPress={() => navigation.navigate('Payment')} style={{ borderRadius:100, overflow: 'hidden',shadowColor: '#FBD490',
          shadowOffset: { width: 4, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 15,
          elevation: 2,}}>
          <View style={{height:50, flexDirection: 'row', alignItems: 'center',  paddingVertical: 10, paddingHorizontal:20, backgroundColor:colors.secondary,
        }}>
            <Text p style={{flex:1}}>See Breakup</Text>
            <View style={{}}>
              <Text p>Make Payment</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{height:14, width:10, tintColor:'#404355', marginRight:4}}
                    source={require('../../../assets/images/icons/rupee.png')}
                  />
                <Text h3 style={{textAlign: 'right'}}>450</Text>
              </View>
            </View>
            <View>
                <Image style={{height:14, width:10, tintColor:'#404355', marginLeft:4}}
                    source={require('../../../assets/images/icons/right.png')}
                  />
            </View>
            {/* <Button 
              title="3 Items" 
              primary lg raised
              iconRight
              icon={
                <Image
                  style={{ tintColor: colors.white, marginTop:4, marginLeft: 10 }}
                  source={require('../../../assets/images/icons/right.png')}
                />
              }
            /> */}
          </View>
        </Ripple>
      </MainContainer>
    </View>  

    </>
  )
}


const styles = StyleSheet.create({
fakeBg:{
  backgroundColor: colors.primary,
  height: 150,
  width: '100%',
  padding: 20, flex: 1,
  position: 'absolute',
  top: 0
},
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
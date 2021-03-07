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

import {useSelector, useDispatch} from "react-redux";
import {clearCart} from "../../redux/actions/cart";


export default function OrderDetailView({navigation, route}) {
  const [number, onChangeNumber] = React.useState(null);
  const { order, deliveryAddress } = route.params;
  const products = useSelector(state => state.home.allProducts || []);
  const dispatch = useDispatch();
  
  const getProductById = (id) => {
    if (!products) return {};
    return products.find(item => item.pro_id == id) || {};
  }

  const updateCart = (item) => {
    dispatch({ type: "CART_PRODUCT_UPDATED", payload: item })
  }
  

  return (
    <>
   
    
    <ScrollView>
    <MainContainer>
      <View style={{marginBottom:80, marginTop:20}}>


        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:5}}>
          <Text h4 bold style={{flex:1}}>Order Details</Text>
          {order.order_status=="2" && <Badge badgeStyle={{ backgroundColor: '#63D8A5' }} value="Delivered" />}
                      {order.order_status=="1" && <Badge badgeStyle={{ backgroundColor: '#5D6275' }} value="Processing" />}
                      {order.order_status=="3" && <Badge badgeStyle={{ backgroundColor: colors.primary }} value="Cancelled" />}
        </View>

        <Paper style={{marginVertical:5}}>
          <View style={{padding:10}}>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <Text caption>Delivery to :</Text>
              </ListItem.Content>
              <Text>{deliveryAddress.house_no}, {deliveryAddress.address}, {deliveryAddress.city}</Text>
            </ListItem>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <Text caption>Date & time :</Text>
              </ListItem.Content>
              <Text>{order.datetime}</Text>
            </ListItem>
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <Text caption>Payment Mode :</Text>
              </ListItem.Content>
              <Text>{order.payment_type}</Text>
            </ListItem>
          </View>
        </Paper>

        <Paper style={{marginVertical:5}}>
          <View style={{padding:10}}>
            {order.order_pro && order.order_pro.map(pro=>{
            const product = getProductById(pro.pro_id);
            return (
            <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:4, backgroundColor: 'transparent'}}>
              <ListItem.Content>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image style={{width: 12, height:12,}}
                    source={require('../../../assets/images/icons/veg.png')}
                  />
                  <Text style={{marginLeft:10}} >{product.name}</Text>
                </View>
              </ListItem.Content>        

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{ marginRight:4}}
                source={require('../../../assets/images/icons/rupee.png')}
              />
              <Text style={{marginLeft:2}}color={colors.primary}>{pro.price} / {pro.weight}</Text>
            </View>
            </ListItem>)})}
            
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
                <Text style={{marginLeft:2, width:50}}>{order.sub_total}</Text>
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
                <Text style={{marginLeft:2, width:50}}>{order.discount_price}</Text>
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
                <Text style={{marginLeft:2, width:50}} bold color={'#404355'}>{order.total_amount}</Text>
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
          <View style={{flex:1, marginHorizontal:10}}><Button  onPress={() => {
            dispatch(clearCart());
            order.order_pro.map(pro=>{
              const product = getProductById(pro.pro_id);
              if(!product) return;
            updateCart({
                qty: parseInt(pro.qty),
                id: pro.pro_id,
                variant: product.price_weight.find(item=>item.weight == pro.weight),
                product: product
            });
          })
            navigation.navigate('Cart');
            }} title="Repeat" raised lg primary/></View>
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
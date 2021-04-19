import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, SafeAreaView, TextInput,Linking } from 'react-native';
import Ripple from 'react-native-material-ripple';

import MainContainer from '../../components/Containers/Main';
import { SearchBar, Avatar, Icon, Badge, withBadge, ListItem, CheckBox, Divider } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from "react-native-gesture-handler";
import { AddAddress } from "../modal/AddAddress";
import { EditAddress } from "../modal/EditAddress";
import { color } from "react-native-reanimated";

import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/actions/cart";
import { clearOrderPlaced } from "../../redux/actions/order";



export default function OrderPlacedView({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  const orderDetails = useSelector(state => state.order.newOrder || {});
  const deliveryAddress = useSelector(state => {
    if (!orderDetails || !state.address.addresses) return {};
    return state.address.addresses.find(add => add.id == orderDetails.address_id) || {};
  });
  const products = useSelector(state => state.home.allProducts || []);
  const dispatch = useDispatch();

  const getProductById = (id) => {
    if (!products) return {};
    return products.find(item => item.pro_id == id) || {};
  }

  useEffect(() => {
    return () => {
      dispatch(clearCart());
      dispatch(clearOrderPlaced());
    }
  }, []);

  return (
    <>


      <ScrollView style={{ backgroundColor: colors.white }}>


        <View style={{ flexDirection: 'row-reverse', marginTop: 10 }}>
          <IconButton
            white noBorder lgR
            // onPress={() => navigation.navigate('Delivery Location')}
            onPress={() => {
              navigation.navigate('Home');
            }}
            icon={
              <Image
                style={{ width: 16 }}
                source={require('../../../assets/images/icons/close.png')}
              />
            }
          />
        </View>

        <MainContainer>
          <View style={{ marginBottom: 80, marginTop: 10 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <View style={{ backgroundColor: '#EEFBF5', padding: 30, borderRadius: 200 }}>
                <View style={{ backgroundColor: '#D5F5E7', padding: 20, borderRadius: 200 }}>
                  <Avatar size={42}
                    rounded containerStyle={{ backgroundColor: '#63D8A5', padding: 10 }}
                    source={require('../../../assets/images/icons/check.png')}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text color={colors.veryDark} h1 hCenter>Order Placed</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1 }}><Divider /></View>
                <Text style={{ marginHorizontal: 10 }} hCenter>Estimate Time Deliver 48 Hrs</Text>
                <View style={{ flex: 1 }}><Divider /></View>
              </View>
              <Text color={colors.primary} hCenter style={{ marginTop: 12 }}>Id : {orderDetails.order_id}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 5 }}>
              <Text h4 bold style={{ flex: 1 }}>Order Details</Text>
              <Badge badgeStyle={{ backgroundColor: '#5D6275', paddingHorizontal: 6, }} value="Processing" />
            </View>

            <Paper style={{ marginVertical: 5 }}>
              <View style={{ padding: 10 }}>
                <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 4, backgroundColor: 'transparent' }}>
                  <ListItem.Content>
                    <Text caption>Delivery to :</Text>
                  </ListItem.Content>
                  <Text>{deliveryAddress.house_no} {deliveryAddress.address}, {deliveryAddress.city}</Text>
                </ListItem>
                <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 4, backgroundColor: 'transparent' }}>
                  <ListItem.Content>
                    <Text caption>Date & time :</Text>
                  </ListItem.Content>
                  <Text>{orderDetails.datetime}</Text>
                </ListItem>
                <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 4, backgroundColor: 'transparent' }}>
                  <ListItem.Content>
                    <Text caption>Payment Mode :</Text>
                  </ListItem.Content>
                  <Text>{orderDetails.payment_type}</Text>
                </ListItem>
              </View>
            </Paper>

            <Paper style={{ marginVertical: 5 }}>
              <View style={{ padding: 10 }}>
                {orderDetails.order_pro && orderDetails.order_pro[0].map(pro => {
                  const product = getProductById(pro.pro_id);
                  return (
                    <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 4, backgroundColor: 'transparent' }}>
                      <ListItem.Content>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image style={{ width: 12, height: 12, }}
                            source={require('../../../assets/images/icons/veg.png')}
                          />
                          <Text style={{ marginLeft: 10 }} >{product.name} ({pro.weight}) X {pro.qty}</Text>
                        </View>
                      </ListItem.Content>
                      <Text color={colors.primary}>Rs. {pro.total_amount} </Text>
                    </ListItem>)
                })}

              </View>
            </Paper>

            <View style={{ marginVertical: 5 }}>
              <View style={{ padding: 10 }}>
                <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 4, backgroundColor: 'transparent' }}>
                  <ListItem.Content>
                    <Text caption>Sub Total</Text>
                  </ListItem.Content>
                  <Text>Rs.{orderDetails.sub_total}</Text>
                </ListItem>
                <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 4, backgroundColor: 'transparent' }}>
                  <ListItem.Content>
                    <Text caption>Discount</Text>
                  </ListItem.Content>
                  <Text>Rs. {orderDetails.discount_price}</Text>
                </ListItem>



                <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 4, backgroundColor: 'transparent' }}>
                  <ListItem.Content>
                    <Text caption>Total Tax</Text>
                  </ListItem.Content>
                  <Text>Rs. {orderDetails.promo_per}</Text>
                </ListItem>

                {orderDetails.promocode !== "" &&
                  <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 4, backgroundColor: 'transparent' }}>
                    <ListItem.Content>
                      <Text caption>Coupon Discount</Text>
                    </ListItem.Content>
                    <Text >{orderDetails.promocode} ( - <Image style={{ height: 10, marginRight: 4 }}
                      source={require('../../../assets/images/icons/rupee.png')}
                    />{orderDetails.promo_discount})</Text>
                  </ListItem>
                }

                <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 4, backgroundColor: 'transparent' }}>
                  <ListItem.Content>
                    <Text bold>Total Amount</Text>
                  </ListItem.Content>
                  <Text bold>Rs. {orderDetails.total_amount}</Text>
                </ListItem>
              </View>
            </View>

          </View>
        </MainContainer>


      </ScrollView>


      <View style={styles.footerMenu}>
        <MainContainer>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginHorizontal: -10 }}>
            <View style={{ flex: 1, marginHorizontal: 10 }}><Button title="Contact" lg secondary raised   onPress={()=>{Linking.openURL('https://www.ramawholesale.in/contact.php');}}/></View>
            <View style={{ flex: 1, marginHorizontal: 10 }}><Button onPress={() => navigation.navigate('Home')} title="Continue" raised lg primary /></View>
          </View>
        </MainContainer>
      </View>

    </>
  )
}


const styles = StyleSheet.create({

  label: {
    marginTop: 4
  },
  footerMenu: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingVertical: 15,
  },


})
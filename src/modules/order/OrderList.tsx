import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, SafeAreaView, TextInput } from 'react-native';
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
import { fetchOrders, cancelOrder } from "../../redux/actions/order";



export default function OrderListView({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);
  const products = useSelector(state => state.home.allProducts);

  const addresses = useSelector(state => state.address.addresses || {});


  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const getProductById = (id) => {
    if (!products) return {};
    return products.find(item => item.pro_id == id) || {};
  }

  return (
    <>


      <ScrollView>
        <MainContainer>
          <View style={{ marginVertical: 20 }}>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: -16 }}>
              {orders && orders.filter(order => order.order_status == "1").length != 0 && <Text h4 bold style={{ flex: 1 }}>Current</Text>}
            </View>
            {orders && orders.filter(order => order.order_status == "1").map(order => {
              const deliveryAddress = addresses.find(add => add.id == order.address_id) || {};
              return (<View key={order.order_id}>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 5 }}>
                  {/* <Text h4 bold style={{ flex: 1 }}>Past</Text> */}
                  <Text style={{ fontSize: 12, color: '#5D6275' }}>{order.datetime}</Text>
                </View>

                <Paper style={{ marginVertical: 5 }}>
                  <Ripple onPress={() => navigation.navigate('Order Detail', { order, deliveryAddress })}>
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                      <Text subtitle2 style={{ flex: 1 }}>ID : {order.order_id}</Text>
                      {order.order_status == "2" && <Badge badgeStyle={{ backgroundColor: '#63D8A5' }} value="Delivered" />}
                      {order.order_status == "1" && <Badge badgeStyle={{ backgroundColor: '#5D6275' }} value="Processing" />}
                      {order.order_status == "3" && <Badge badgeStyle={{ backgroundColor: colors.primary }} value="Cancelled" />}
                    </View>

                    <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                      <View style={{ marginBottom: 5 }}>
                        <Text caption>Address</Text>
                        <Text>{deliveryAddress.house_no && deliveryAddress.house_no.trim()}, {deliveryAddress.address && deliveryAddress.address.trim() + ','} {deliveryAddress.city && deliveryAddress.city.trim()}</Text>
                      </View>

                      {order.order_pro && order.order_pro.map(pro => {
                        const product = getProductById(pro.pro_id);
                        return (
                          <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 4, backgroundColor: 'transparent' }} key={pro.pro_id}>
                            <ListItem.Content>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ width: 12, height: 12, }}
                                  source={require('../../../assets/images/icons/veg.png')}
                                />
                                <Text style={{ marginLeft: 10 }} >{product.name} ({pro.weight}) X {pro.qty}</Text>
                              </View>
                            </ListItem.Content>
                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                              <Image style={{ marginRight: 4 }}
                                source={require('../../../assets/images/icons/rupee.png')}
                              />
                              <Text style={{ marginLeft: 2 }} h4 bold color={'#404355'}>{pro.total_amount}</Text>
                            </View>

                          </ListItem>)
                      })}

                    </View>
                  </Ripple>

                  <Divider style={{ marginTop: 6, borderWidth: 0.5, borderColor: '#F9C5C5', borderRadius: 20, borderStyle: 'dashed' }} />
                  <Button title="Cancel Order " flat md white noBorder
                    icon={
                      <Image
                        style={{ tintColor: colors.primary, marginRight: 10, width: 10 }}
                        source={require('../../../assets/images/icons/close.png')}
                      />
                    }
                    onPress={async () => {
                      await dispatch(cancelOrder(order.order_id));
                      dispatch(fetchOrders());
                    }}
                  />
                </Paper>
              </View>)
            })}




            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: -16 }}>
              {orders && orders.filter(order => order.order_status != "1") && <Text h4 bold style={{ flex: 1 }}>Past</Text>}

            </View>


            {orders && orders.filter(order => order.order_status != "1").map(order => {
              const deliveryAddress = addresses.find(add => add.id == order.address_id) || {};
              return (<>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 5 }}>
                  {/* <Text h4 bold style={{ flex: 1 }}>Past</Text> */}
                  <Text style={{ fontSize: 12, color: '#5D6275' }}>{order.datetime}</Text>
                </View>

                <Paper style={{ marginVertical: 5 }}>
                  <Ripple onPress={() => navigation.navigate('Order Detail', { order, deliveryAddress })}>
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                      <Text subtitle2 style={{ flex: 1 }}>ID : {order.order_id}</Text>
                      {order.order_status == "2" && <Badge badgeStyle={{ backgroundColor: '#63D8A5' }} value="Delivered" />}
                      {order.order_status == "1" && <Badge badgeStyle={{ backgroundColor: '#5D6275' }} value="Processing" />}
                      {order.order_status == "3" && <Badge badgeStyle={{ backgroundColor: colors.primary }} value="Cancelled" />}
                    </View>

                    <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                      <View style={{ marginBottom: 5 }}>
                        <Text caption>Address</Text>
                        <Text>{deliveryAddress.house_no && deliveryAddress.house_no.trim()}, {deliveryAddress.address && deliveryAddress.address.trim() + ','} {deliveryAddress.city && deliveryAddress.city.trim()}</Text>
                      </View>

                      {order.order_pro && order.order_pro.map(pro => {
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

                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                              <Image style={{ marginRight: 4 }}
                                source={require('../../../assets/images/icons/rupee.png')}
                              />
                              <Text style={{ marginLeft: 2 }} h4 bold color={'#404355'}>{pro.total_amount}</Text>
                            </View>

                          </ListItem>
                        )
                      })}

                    </View>
                  </Ripple>
                </Paper>




              </>)
            })}





          </View>
        </MainContainer>


      </ScrollView>

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
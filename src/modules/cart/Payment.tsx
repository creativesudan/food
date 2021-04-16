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
import agent from "../../agent";
import { codOrder, onlineOrder } from "../../redux/actions/cart";


const item = [
  { id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295 },
  { id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295 },
]


const data = [
  { id: 'b', label: 'Sweets', image: require('../../../assets/images/server_icons/sweets.png') },
  { id: 'c', label: 'Cakes', image: require('../../../assets/images/server_icons/cake.png') },
  { id: 'd', label: 'Namken', image: require('../../../assets/images/server_icons/namkeen.png') },
  { id: 'e', label: 'Biscuits', image: require('../../../assets/images/server_icons/biscuits.png') },
  { id: 'f', label: 'Others', image: require('../../../assets/images/server_icons/ice-cream.png') },
];


export default function PaymentView({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [orderInProgress, setOrderInProgress] = useState(false);
  const PAYMENT_TYPE_COD = "PAYMENT_TYPE_COD";
  const PAYMENT_TYPE_ONLINE = "PAYMENT_TYPE_ONLINE";
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPE_COD);
  const cart = useSelector(state => state.cart);
  const deliveryAddress = useSelector(state => state.app.address);
  const dispatch = useDispatch();

  const prepareOrder = () => {
    let orderDetails = {
      total_amount: cart.total,
      total_product: cart.items.reduce((total, obj) => total + obj.qty, 0),
      prodata: [],
      address_id: deliveryAddress.id,
      code_id: cart.appliedCoupon ? cart.appliedCoupon.id : "",
      promocode: cart.appliedCoupon ? cart.appliedCoupon.name : "",
      promo_discount: cart.couponDiscount,
      sub_total: cart.subTotal,
      discount_price: cart.discount,
      promo_per: cart.totalTax
    };

    cart.items.map(item => {
      orderDetails.prodata.push({
        pro_id: item.id,
        qty: item.qty,
        price: item.variant.price,
        discount: parseInt(item.variant.mrp) - parseInt(item.variant.price),
        total_amount: parseInt(item.variant.mrp) * parseInt(item.qty),
        food_type: parseInt(item.product.type) == 1 ? "Veg" : "Non-Veg",
        weight: item.variant.weight
      });
    });

    return orderDetails;
  }

  useEffect(() => {
    if (orderInProgress) order();
    console.log("HELLLOOOOOOO222222");
    console.log(orderInProgress);
  }, [orderInProgress]);

  const order = () => {
    const orderDetails = prepareOrder();
    console.log(orderDetails);

    return agent.Order.addOrder(orderDetails).then(
      res => {
        if (res.response.status == "1") {
          console.log(res);
          const orderId = res.response.data.order_id;
          if (paymentType == PAYMENT_TYPE_COD) {
            dispatch(codOrder(orderId));
            navigation.navigate('Order Summary');
          }
          else if (paymentType == PAYMENT_TYPE_ONLINE) {

            dispatch(onlineOrder(orderId, "TEST"));
            navigation.navigate('Order Summary');

          }


        } else {
          console.log("Error Placing Order!");
          setOrderInProgress(false);
        }
      },
      error => {
        console.log("Error Placing Order!" + error);
        setOrderInProgress(false);
      });
  }

  return (
    <>

      {addAddress && <AddAddress setAddAddress={setAddAddress} />}
      {editAddress && <EditAddress setEditAddress={setEditAddress} />}

      <ScrollView>
        <MainContainer>
          <View style={{ marginBottom: 80 }}>
            {/* <View style={{ marginVertical: 12 }}>
              <Text style={{ marginBottom: 5, }}>Select your method of payment</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ tintColor: '#12B407' }}
                  source={require('../../../assets/images/icons/tick.png')}
                />
                <Text caption style={{ marginLeft: 5 }}>100% Secure Payment</Text>
              </View>
            </View> */}

            {/* <Paper>
              <View style={{ paddingHorizontal: 10, marginVertical: 16, }}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={{ marginRight: 10 }}>
                    <Image
                      style={{ tintColor: colors.primary }}
                      source={require('../../../assets/images/icons/wallet.png')}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
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

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Image source={require('../../../assets/images/icons/mastercard.png')} />
                  <Text style={{ marginLeft: 10, flex: 1 }}>5172 XXXX XXXX 4728</Text>

                  <View style={{
                    borderColor: '#F3E6E6', borderWidth: 1,
                    flexDirection: 'row', backgroundColor: colors.white, borderRadius: 100, alignItems: 'center'
                  }}>
                    <View style={{ paddingHorizontal: 30 }}>
                      <TextInput
                        style={{ height: 37 }}
                        onChangeText={onChangeNumber}
                        value={number}
                        placeholder="CVV"
                        keyboardType="numeric"
                      /></View>
                  </View>

                </View>
              </View>
            </Paper> */}

            {/* <View style={{ marginVertical: 10 }}>
              <Paper>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10 }}>
                  <Text style={{ flex: 1 }}>Add Debit / Credit</Text>
                  <View style={{ marginHorizontal: 5 }}><Image source={require('../../../assets/images/icons/visa.png')} /></View>
                  <View style={{ marginHorizontal: 5 }}><Image source={require('../../../assets/images/icons/mastercard.png')} /></View>
                  <View style={{ marginHorizontal: 5 }}><Image source={require('../../../assets/images/icons/aexpress.png')} /></View>
                  <View>
                    <Image source={require('../../../assets/images/icons/expand_more.png')} />
                  </View>
                </View>
              </Paper>
            </View> */}

            <Ripple style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginTop: 10 }} onPress={() => setPaymentType(PAYMENT_TYPE_COD)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: 22, height: 22, borderWidth: 1, borderColor: '#F9C5C5', borderRadius: 100 }} >
                <View style={{ marginLeft: 6, flexDirection: 'row', width: 8, height: 8, backgroundColor: paymentType == PAYMENT_TYPE_COD ? colors.primary : colors.white, borderRadius: 10 }}></View>
              </View>
              <Text style={{ marginLeft: 10 }}>Cash On Delivery</Text>
            </Ripple>

            {/* <Ripple style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginTop: 10 }} onPress={() => setPaymentType(PAYMENT_TYPE_ONLINE)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: 22, height: 22, borderWidth: 1, borderColor: '#F9C5C5', borderRadius: 100 }}>
                <View style={{ marginLeft: 6, flexDirection: 'row', width: 8, height: 8, backgroundColor: paymentType == PAYMENT_TYPE_ONLINE ? colors.primary : colors.white, borderRadius: 10 }}></View>
              </View>
              <Text style={{ marginLeft: 10 }}>Online Payment</Text>
            </Ripple> */}

            {/* <View style={{ marginVertical: 5 }}>
              <Text>Wallet</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: -12 }}>
                <Ripple style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 22, height: 22, borderWidth: 1, borderColor: '#F9C5C5', borderRadius: 100 }}>
                    <View style={{ marginLeft: 6, flexDirection: 'row', width: 8, height: 8, backgroundColor: '#F3E6E6', borderRadius: 10 }}></View>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Image source={require('../../../assets/images/icons/paytm.png')} />
                  </View>
                </Ripple>

                <Ripple style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 22, height: 22, borderWidth: 1, borderColor: '#F9C5C5', borderRadius: 100 }}>
                    <View style={{ marginLeft: 6, flexDirection: 'row', width: 8, height: 8, backgroundColor: '#F3E6E6', borderRadius: 10 }}></View>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Image source={require('../../../assets/images/icons/phone_pe.png')} />
                  </View>
                </Ripple>
              </View>
            </View> */}

            {/* <Divider style={{ marginVertical: 5 }} />

            <View style={{ marginVertical: 5 }}>
              <Text >UPI</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: -12 }}>
                <Ripple style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 22, height: 22, borderWidth: 1, borderColor: '#F9C5C5', borderRadius: 100 }}>
                    <View style={{ marginLeft: 6, flexDirection: 'row', width: 8, height: 8, backgroundColor: '#F3E6E6', borderRadius: 10 }}></View>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Image source={require('../../../assets/images/icons/paytm.png')} />
                  </View>
                </Ripple>

                <Ripple style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 22, height: 22, borderWidth: 1, borderColor: '#F9C5C5', borderRadius: 100 }}>
                    <View style={{ marginLeft: 6, flexDirection: 'row', width: 8, height: 8, backgroundColor: '#F3E6E6', borderRadius: 10 }}></View>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Image source={require('../../../assets/images/icons/phone_pe.png')} />
                  </View>
                </Ripple>

                <Ripple style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 22, height: 22, borderWidth: 1, borderColor: '#F9C5C5', borderRadius: 100 }}>
                    <View style={{ marginLeft: 6, flexDirection: 'row', width: 8, height: 8, backgroundColor: '#F3E6E6', borderRadius: 10 }}></View>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Image source={require('../../../assets/images/icons/gpay.png')} />
                  </View>
                </Ripple>
              </View>
            </View> */}

            {/* <View style={{ marginVertical: 5 }}>
              <Text>Net Banking</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: -20, marginTop: 15 }}>
                <View style={{ marginHorizontal: 20, flexDirection: 'column', alignSelf: 'center', alignItems: 'center' }}>
                  <Image source={require('../../../assets/images/server_icons/hdfc.png')} />
                  <Text style={{ marginTop: 10 }}>HDFC</Text>
                </View>
                <View style={{ marginHorizontal: 20, flexDirection: 'column', alignSelf: 'center', alignItems: 'center' }}>
                  <Image source={require('../../../assets/images/server_icons/icici.png')} />
                  <Text style={{ marginTop: 10 }}>ICICI</Text>
                </View>
                <View style={{ marginHorizontal: 20, flexDirection: 'column', alignSelf: 'center', alignItems: 'center' }}>
                  <Image source={require('../../../assets/images/server_icons/sbi.png')} />
                  <Text style={{ marginTop: 10 }}>SBI</Text>
                </View>
                <View style={{ marginHorizontal: 20, flexDirection: 'column', alignSelf: 'center', alignItems: 'center' }}>
                  <Image source={require('../../../assets/images/server_icons/axis.png')} />
                  <Text style={{ marginTop: 10 }}>AXIS</Text>
                </View>
                <View style={{ marginHorizontal: 20, flexDirection: 'column', alignSelf: 'center', alignItems: 'center' }}>
                  <Image source={require('../../../assets/images/server_icons/citi.png')} />
                  <Text style={{ marginTop: 10 }}>CITI</Text>
                </View>
              </View>

            </View>

            <Divider style={{ marginVertical: 5 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text h5 style={{ flex: 1 }}>More Banks</Text>
              <Image source={require('../../../assets/images/icons/down.png')} />
            </View> */}

          </View>
        </MainContainer>


      </ScrollView>


      <View style={styles.footerMenu}>
        <MainContainer>
          <Ripple onPress={() => {

            console.log("HELLLOOOOOOOOOOOO");
            console.log(orderInProgress);
            if (orderInProgress) {
              return;
            }



            setOrderInProgress(true);



          }} style={{ borderRadius: 100, overflow: 'hidden' }} disabled={orderInProgress}>
            <View style={{ position: 'relative', backgroundColor: colors.secondary }}>
              <View style={{
                flexDirection: 'row', alignItems: 'center', alignSelf: 'center',
                paddingVertical: 10, height: 50, paddingHorizontal: 20,
              }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {(paymentType == PAYMENT_TYPE_ONLINE) ? (<><Text title style={{ marginRight: 10 }}>Pay</Text>
                    <Image style={{ height: 14, width: 10, tintColor: '#404355', marginRight: 4 }}
                      source={require('../../../assets/images/icons/rupee.png')}
                    />
                    <Text h3 style={{ textAlign: 'right' }}>{cart.total}</Text></>) : (<Text title style={{ marginRight: 10 }}>Place Order</Text>)}
                </View>

              </View>

              <View style={{ position: 'absolute', right: 20, top: 18 }}><Image source={require('../../../assets/images/icons/right.png')} style={{ tintColor: '#404355' }} /></View>
            </View>

          </Ripple>
        </MainContainer>
      </View>

    </>
  )
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary
  },

  label: {
    marginTop: 4
  },
  footerMenu: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingVertical: 10,
  },


})
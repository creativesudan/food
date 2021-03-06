import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, SafeAreaView, TextInput } from 'react-native';
import Ripple from 'react-native-material-ripple';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import RBSheet from 'react-native-raw-bottom-sheet';
import MainContainer from '../../components/Containers/Main';
import { Avatar, Icon, Badge, withBadge, ListItem, Divider, CheckBox } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from "react-native-gesture-handler";
import { AddAddress } from "../modal/AddAddress";
import { EditAddress } from "../modal/EditAddress";
import { useSelector, useDispatch } from "react-redux";
import AddProduct from "../global/AddProduct";
import { fetchCoupons, addCouponToCart, fetchTax, removeFromCart } from "../../redux/actions/cart";
import { fetchAddressList } from "../../redux/actions/address";
import SearchBar from "../global/SearchBar";

import lazyLoad from "../../redux/actions/lazyLoad";


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


export default function CartView({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState({ show: false });

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
  const allAddresses = useSelector(state => state.address.addresses);
  const addresses = useSelector(state => state.address.addresses || []);
  const deliveryAddress = useSelector(state => {
    if (addresses.length == 0) return null;
    return addresses.find(address => {
      if (state.app.address) return address.id == state.app.address.id;
      return false;
    })
  });
  const cartItems = useSelector(state => state.cart.items);
  const cart = useSelector(state => state.cart);
  const products = useSelector(state => state.home.allProducts || []);
  const dispatch = useDispatch();
  const [addProduct, setAddProduct] = useState({});
  const [coupon, setCoupon] = useState(cart.appliedCoupon ? cart.appliedCoupon.name : "");
  const isFirstRun = useRef(true);
  const cartItemsCount = useSelector(state => state.cart.items.reduce((total, obj) => total + obj.qty, 0));

  const getProductById = (id) => {
    if (!products) return {};
    return products.find(item => item.pro_id == id) || {};
  }

  const getCartItemById = (id, variant) => {
    const product = getProductById(id);
    let initialCartItem = {}
    if (product && product.price_weight) {
      initialCartItem = { qty: 0, variant: product.price_weight[0] || {}, id: id, product: product };
    }

    if (!cartItems) return initialCartItem;
    const items = cartItems.find(item => item.id == id && item.variant.weight == variant.weight) || initialCartItem;

    return { ...items };
  }

  const updateCart = (item) => {
    dispatch({ type: "CART_PRODUCT_ADDED", payload: item })
  }

  const removeCart = (item) => {
    dispatch(removeFromCart(item))
  }
  const getAddressType = (id) => {
    if (id == 1) return "Work";
    if (id == 2) return "Home";
    else return "Other";
  }


  useEffect(() => {
    if (!cart.coupons) dispatch(lazyLoad(fetchCoupons()));
    if (!cart.tax) dispatch(fetchTax());
    if (!addresses || addresses.length == 0) dispatch(lazyLoad(fetchAddressList()));
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (cartItems.length == 0 || cartItems.reduce((total, obj) => total + obj.qty, 0) == 0) navigation.navigate("Home");
  }, [cartItems]);

  const applyCoupon = () => {
    if (!cart.coupons) return;
    const verifiedCoupon = cart.coupons.find(item => item.name.toLowerCase().trim() == coupon.toLowerCase().trim());
    if (!verifiedCoupon) return;
    dispatch(addCouponToCart(verifiedCoupon));
  }

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
        <View style={{ position: 'absolute', top: 10, zIndex: 1, right: 10 }}>
          <IconButton
            white noBorder mdR
            onPress={() => {
              AssetsDrawer.current?.close()
            }}
            icon={
              <Image style={{ width: 14 }} source={require('../../../assets/images/icons/close.png')} />
            }
          />
        </View>
        <AddProduct product={getProductById(addProduct.id)} setProduct={updateCart} InitialCartItem={getCartItemById(addProduct.id, addProduct.variant)} AssetsDrawer={AssetsDrawer} />

      </RBSheet>

      {addAddress && <AddAddress setAddAddress={setAddAddress} />}
      {editAddress.show && <EditAddress setEditAddress={setEditAddress} editAddress={deliveryAddress} />}

      <View style={styles.header}>
        <MainContainer>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <IconButton
                primary noBorder mdR
                onPress={() => navigation.goBack()}
                icon={
                  <Image
                    style={{ width: 16, height: 16, tintColor: colors.white }}
                    source={require('../../../assets/images/icons/back.png')}
                  />
                }
              />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text h4 color={colors.white}>My Cart</Text>
              <Text p color={colors.white}>{cartItemsCount} items</Text>
            </View>

            <View>
              <Text p bold style={{ textAlign: 'right' }} color={colors.white}>Free Delivery</Text>
              {/* <Text p color={colors.white}>with min order 400</Text> */}
            </View>

          </View>

          <SearchBar />


        </MainContainer>

      </View>

      <ScrollView>
        <MainContainer>


          <Text style={{ marginBottom: 5, marginTop: 15 }}>Delivery Address  </Text>
          <View style={{ backgroundColor: '#F3E6E6', padding: 10, marginBottom: 10, borderRadius: 5 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, paddingLeft: deliveryAddress && 20 }}>
                {deliveryAddress && <>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text color={colors.primary}>{getAddressType(deliveryAddress.address_type)}</Text>

                      <View style={{ flexDirection: 'row', marginLeft: -16, alignItems: 'center' }}>
                        <Image
                          style={{ tintColor: colors.primary }}
                          source={require('../../../assets/images/icons/tick.png')}
                        />
                        <Text subtitle2 style={{ marginLeft: 5 }}>{deliveryAddress.name}</Text>
                      </View>

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: -5 }}>
                      {deliveryAddress.default == "1" && <Badge badgeStyle={{ backgroundColor: colors.primary }} value="Default" />}

                      <IconButton transparent noBorder md
                        onPress={() => {
                          setEditAddress({ show: true });
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

                  <Text>{deliveryAddress.house_no.trim() || ""} {deliveryAddress.address.trim() || ""} {deliveryAddress.landmark.trim()}, {deliveryAddress.city.trim() || ""} {deliveryAddress.state.trim()},</Text>
                  {deliveryAddress.pincode != '' && <Text>Pin - {deliveryAddress.pincode}</Text>}
                  {deliveryAddress.mobile != '' && <Text>+91 {deliveryAddress.mobile}</Text>}
                </>}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: -5 }}>
                  {allAddresses && allAddresses.length != 0 &&
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Ripple onPress={() => navigation.navigate('Manage Address')} style={{ flexDirection: 'row', padding: 5, alignItems: 'center', }}>
                          <Text style={{ marginRight: 5, color: colors.primary }}>Choose Address</Text>
                          <Image style={{ marginTop: 3, tintColor: colors.primary }} source={require('../../../assets/images/icons/down.png')} />
                        </Ripple>
                      </View>
                    </View>
                  }

                  <Ripple style={{ flexDirection: 'row', padding: 5, alignItems: 'center', }}
                    onPress={() => {
                      setAddAddress(true);
                    }}
                  >
                    <Text style={{ marginRight: 10, color: colors.primary }}>Add</Text>
                    <Image style={{ width: 12, height: 12, tintColor: colors.primary }}
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
          <View style={{ marginBottom: 90 }}>
            {cartItems.map(item => {
              const product = getProductById(item.id);
              return (
                <View style={{ marginVertical: 5 }}>
                  <Paper>
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                      <Image style={{ width: 78, height: 78, borderRadius: 5 }}
                        source={{ uri: item.product.image }}
                      />
                      <View style={{ flex: 1, paddingLeft: 16 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image style={{ width: 12, height: 12, }}
                            source={require('../../../assets/images/icons/veg.png')}
                          />
                          <Text style={{ marginLeft: 6 }}>{product.name}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 10, marginRight: 2 }}
                              source={require('../../../assets/images/icons/rupee.png')}
                            />
                            <Text color={colors.primary}>{item.variant.price} / {item.variant.weight}</Text>
                            <Image style={{ height: 10, marginLeft:6, marginRight: 2, tintColor:colors.dark }}
                              source={require('../../../assets/images/icons/rupee.png')}
                            />
                            <Text style={{ textDecorationLine: 'line-through' }}>{item.variant.mrp}</Text>
                          </View>
                          <View style={{ width: 100 }}>
                            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary, borderRadius: 100 }}>
                              <IconButton
                                white noBorder mdR
                                onPress={() => {
                                  // setAddProduct({ ...addProduct, qty: (addProduct.qty <= 0 ? 0 : addProduct.qty - 1) });

                                  removeCart({ ...item, qty: (item.qty <= 0 ? 0 : item.qty - 1) });

                                }}
                                icon={<Image source={require('../../../assets/images/icons/minus.png')} style={{ tintColor: colors.primary }} />}
                              />

                              <Text hCenter style={{ flex: 1, fontSize: 14 }}>{item.qty <= 0 ? 'Add' : item.qty}</Text>
                              <IconButton
                                white noBorder mdR
                                onPress={() => {
                                  setAddProduct({ ...addProduct, id: item.id, variant: item.variant });
                                  AssetsDrawer.current?.open()
                                }}
                                icon={
                                  <Image source={require('../../../assets/images/icons/plus.png')} style={{ tintColor: colors.primary }} />
                                }
                              />
                            </View>
                          </View>
                        </View>

                      </View>
                    </View>
                  </Paper>
                </View>
              )
            })}

            <View style={{
              shadowColor: '#000',
              shadowOffset: { width: 4, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
              flexDirection: 'row', marginTop: 10, backgroundColor: colors.white, borderRadius: 100, alignItems: 'center'
            }}>
              <View style={{ flex: 1, paddingLeft: 10, }}>
                <TextInput
                  style={{ height: 37 }}
                  onChangeText={setCoupon}
                  value={coupon}
                  placeholder="Promo Code"
                /></View>
              <View style={{ width: 100 }}>
                {coupon === "" ? <Button title="Apply" md disable /> :
                  <Button title="Apply" md primary onPress={applyCoupon} />
                }
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text subtitle2 >Payment Details</Text>

              <ListItem bottomDivider containerStyle={{ paddingHorizontal: 0, paddingVertical: 5, backgroundColor: 'transparent' }}>
                <ListItem.Content>
                  <Text caption>Total MRP</Text>
                </ListItem.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ height: 10, marginRight: 4 }}
                    source={require('../../../assets/images/icons/rupee.png')}
                  />
                  <Text>{cart.subTotal}</Text>
                </View>
              </ListItem>

              <ListItem bottomDivider containerStyle={{ paddingHorizontal: 0, paddingVertical: 5, backgroundColor: 'transparent' }}>
                <ListItem.Content>
                  <Text caption>Discount</Text>
                </ListItem.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ height: 10, marginRight: 4 }}
                    source={require('../../../assets/images/icons/rupee.png')}
                  />
                  <Text>{cart.discount}</Text>
                </View>
              </ListItem>

              <ListItem bottomDivider containerStyle={{ paddingHorizontal: 0, paddingVertical: 5, backgroundColor: 'transparent' }}>
                <ListItem.Content>
                  <Text caption>Sub Total</Text>
                </ListItem.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ height: 10, marginRight: 4 }}
                    source={require('../../../assets/images/icons/rupee.png')}
                  />
                  <Text>{cart.priceTotal}</Text>
                </View>
              </ListItem>

              <ListItem bottomDivider containerStyle={{ paddingHorizontal: 0, paddingVertical: 5, backgroundColor: 'transparent' }}>
                <ListItem.Content>
                  <Text caption>Delivery</Text>
                </ListItem.Content>
                <Text color={colors.primary}>Free</Text>
              </ListItem>

              <ListItem bottomDivider containerStyle={{ paddingHorizontal: 0, paddingVertical: 5, backgroundColor: 'transparent' }}>
                <ListItem.Content>
                  <Text caption>Taxes</Text>
                </ListItem.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ height: 10, marginRight: 4 }}
                    source={require('../../../assets/images/icons/rupee.png')}
                  />
                  <Text>{cart.totalTax}</Text>
                </View>
              </ListItem>

              {cart.appliedCoupon && <ListItem bottomDivider containerStyle={{ paddingHorizontal: 0, paddingVertical: 5, backgroundColor: 'transparent' }}>
                <ListItem.Content>
                  <Text caption>Coupon</Text>
                </ListItem.Content>
                <Text >{cart.appliedCoupon.name} ( - <Image style={{ height: 10, marginRight: 4 }}
                  source={require('../../../assets/images/icons/rupee.png')}
                />{cart.couponDiscount})</Text>
              </ListItem>}
              {/* <ListItem bottomDivider containerStyle={{ paddingHorizontal: 0, paddingVertical: 10, backgroundColor: 'transparent' }}>
                <ListItem.Content>
                  <Text subtitle2>Total Tax</Text>
                  {cart.tax && cart.tax.map(t => <Text caption>{t.name} : {t.percantage} %</Text>)}
                </ListItem.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ height: 10, marginRight: 4 }}
                    source={require('../../../assets/images/icons/rupee.png')}
                  />
                  <Text subtitle2>{cart.totalTax}</Text>
                </View>
              </ListItem> */}
              <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 10, backgroundColor: 'transparent' }}>
                <ListItem.Content>
                  <Text subtitle2>Total Amount</Text>
                </ListItem.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ height: 10, marginRight: 4 }}
                    source={require('../../../assets/images/icons/rupee.png')}
                  />
                  <Text subtitle2>{cart.total}</Text>
                </View>
              </ListItem>

            </View>

          </View>
        </MainContainer>
      </ScrollView>

      {cartItems.length > 0 && deliveryAddress && (
        <View style={styles.footerMenu}>
          <MainContainer>
            <Ripple onPress={() => navigation.navigate('Payment')} style={{
              borderRadius: 100, overflow: 'hidden', shadowColor: '#FBD490',
              shadowOffset: { width: 4, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 15,
              elevation: 2,
            }}>
              <View style={{
                height: 50, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, backgroundColor: colors.secondary,
              }}>
                <Text p style={{ flex: 1 }}>Make Payment</Text>
                <View style={{}}>
                  {/* <Text p>Make Payment</Text> */}
                  <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                    <Image style={{ height: 14, width: 10, tintColor: '#404355', marginRight: 4 }}
                      source={require('../../../assets/images/icons/rupee.png')}
                    />
                    <Text h3 style={{ textAlign: 'right' }}>{cart.total}</Text>
                  </View>
                </View>
                <View>
                  <Image style={{ height: 14, width: 10, tintColor: '#404355', marginLeft: 4 }}
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
        </View>)}

    </>
  )
}


const styles = StyleSheet.create({
  fakeBg: {
    backgroundColor: colors.primary,
    height: 150,
    width: '100%',
    padding: 20, flex: 1,
    position: 'absolute',
    top: 0
  },
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
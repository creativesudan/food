import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ripple from 'react-native-material-ripple';

import RBSheet from 'react-native-raw-bottom-sheet';
import MainContainer from '../../components/Containers/Main';
import { Avatar, Icon, Divider, ListItem, CheckBox } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
import { ScrollView } from "react-native-gesture-handler";
import { MenuModal } from "../modal/Menu";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/home";
import { removeFromCart } from "../../redux/actions/cart";
import AddProduct from "../global/AddProduct";
import agent from "../../agent";
import SearchBar from "../global/SearchBar";


const item = [
  { id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295 },
  { id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295 },
  { id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295 },
  { id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295 },
  { id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295 },
  { id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295 },
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


export default function CategoryView({ route, navigation }) {

  const [qty, setQty] = useState(0);
  const [addProduct, setAddProduct] = useState({});
  const AssetsDrawer = useRef<RBSheet>(null);
  const { category } = route.params;
  const dispatch = useDispatch();
  const products = useSelector(state => state.home.products || []);
  const categories = useSelector(state => state.home.categories || []);
  const deliveryAddress = useSelector(state => state.app.address || {});
  const cartItems = useSelector(state => state.cart.items);
  const cartCategoryItems = useSelector(state => state.cart.items.reduce((total, obj) => ((obj.product.cat_id == category.id) ? (total + obj.qty) : total), 0))
  const cartItemsCount = useSelector(state => state.cart.items.reduce((total, obj) => total + obj.qty, 0));
  const cart = useSelector(state => state.cart);

  const getProductById = (id) => {
    if (!products) return {};
    return products.find(item => item.pro_id == id) || {};
  }

  const getCartItemById = (id) => {
    const product = getProductById(id);
    let initialCartItem = {}
    if (product && product.price_weight) {
      initialCartItem = { qty: 0, variant: product.price_weight.length > 0 ? product.price_weight[0] : {}, id: id, product: product };
    }

    if (!cartItems) return initialCartItem;
    const items = cartItems.find(item => item.id == id) || initialCartItem;

    return { ...items };
  }

  const updateCart = (item) => {
    dispatch({ type: "CART_PRODUCT_ADDED", payload: item })
  }

  const removeCart = (item) => {
    dispatch(removeFromCart(item))
  }

  useEffect(() => {
    dispatch(fetchProducts(category.id));

  }, [category]);

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
        <AddProduct product={getProductById(addProduct.id)} setProduct={updateCart} InitialCartItem={getCartItemById(addProduct.id)} AssetsDrawer={AssetsDrawer} />

      </RBSheet>

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
            <View style={{ flex: 1 }}>
              <Text h1 color={colors.white}>{category.name}</Text>
              {/* <TouchableOpacity onPress={() => navigation.navigate('Delivery Location')}>
                <Text color={colors.white}>Deliver to :</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text bold color={colors.white}>{deliveryAddress.name || "Select Address"}</Text>
                  <Image style={{ tintColor: colors.white, marginLeft: 5 }}
                    source={require('../../../assets/images/icons/expand_more.png')}
                  />
                </View>
              </TouchableOpacity> */}
            </View>


            <Ripple style={{ padding: 10 }}
              onPress={() => cartItemsCount != 0 && navigation.navigate('Cart')}
            >
              <Text style={{
                position: 'absolute', zIndex: 1, right: 2, top: 2,
                backgroundColor: colors.secondary,
                borderRadius: 20, width: 20, height: 20,
                lineHeight: 20, fontSize: 10
              }} hCenter>{cartItemsCount}</Text>
              <Image style={{}}
                source={require('../../../assets/images/icons/cart.png')}
              />
            </Ripple>


          </View>


          <SearchBar />

        </MainContainer>

      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Ripple style={{ padding: 10, }}>
          <View>
            <Text h3>{category.name}</Text>
            <Text caption>{products.length} items found</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 5 }}><Image style={{ width: 11, height: 6 }} source={require('../../../assets/images/icons/down.png')} /></View>
          </View>
        </Ripple>

        <ScrollView horizontal={true} style={{ borderColor: '#F3E6E6', borderLeftWidth: 2, }}>

          {categories.map(item => {
            if (category.id != item.id) {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Ripple onPress={() => navigation.setParams({ "category": item })}>
                      <View style={{ marginVertical: 7, paddingHorizontal: 10, alignItems: 'center' }}>
                        <View style={{ alignItems: 'center', }}>
                          <Image style={{ width: 48, height: 32 }} source={{
                            uri: agent.MEDIA_ROOT + '/category/' + item.icon
                          }} />
                        </View>
                        <Text caption hCenter style={styles.label}>{item.name}</Text>
                      </View>
                    </Ripple>
                  </View>
                </View>
              )
            }
          })}


        </ScrollView>
      </View>

      <ScrollView>

        <MainContainer>
          <View style={{ marginBottom: 70 }}>
            {products.map(product => (
              <View style={{ marginVertical: 5 }}>
                <Paper>
                  <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 78, height: 78, borderRadius: 5 }}
                      source={{ uri: product.image }}
                    />
                    <View style={{ flex: 1, paddingLeft: 10 }}>
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
                          <Text color={colors.primary}>{product.price_weight.length > 0 ? product.price_weight[0].price + "/" : ""}{product.price_weight.length > 0 ? product.price_weight[0].weight : ""}</Text>
                          <View style={{ marginLeft: 6, flexDirection:'row', alignItems:'center'}}>
                            <Image style={{ height: 10, marginRight: 2, marginTop:2, tintColor:'#000' }}
                              source={require('../../../assets/images/icons/rupee.png')}
                            />
                            <Text style={{ textDecorationLine: 'line-through' }}>{product.price_weight.length > 0 ? product.price_weight[0].mrp : ""}</Text>
                          </View>
                        </View>
                        
                        <View style={{ width: 100 }}>

                          <View style={{ height: 34, overflow: 'hidden', marginTop: 5, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary, borderRadius: 100 }}>
                            {getCartItemById(product.pro_id).qty <= 0 && <Text onPress={() => {
                              setAddProduct({ ...addProduct, id: product.pro_id });
                              AssetsDrawer.current?.open();
                            }} hCenter style={{ flex: 1, fontSize: 14 }}>Add</Text>}
                            {(getCartItemById(product.pro_id).qty > 0) && <>
                              <IconButton
                                white noBorder mdR
                                onPress={() => {
                                  // setAddProduct({ ...addProduct, qty: (addProduct.qty <= 0 ? 0 : addProduct.qty - 1) });
                                  const cartItem = getCartItemById(product.pro_id);
                                  removeCart({ ...cartItem, qty: (cartItem.qty <= 0 ? 0 : cartItem.qty - 1) })
                                }}
                                icon={<Image source={require('../../../assets/images/icons/minus.png')} style={{ tintColor:colors.primary}} />}
                              />

                              <Text hCenter style={{ flex: 1, fontSize: 14 }}>{cart.countByProduct(product.pro_id)}</Text>
                              <IconButton
                                white noBorder mdR
                                onPress={() => {
                                  setAddProduct({ ...addProduct, id: product.pro_id });
                                  AssetsDrawer.current?.open();
                                }}
                                icon={
                                  <Image source={require('../../../assets/images/icons/plus.png')}  style={{ tintColor:colors.primary}}/>
                                }
                              />
                            </>}
                          </View>

                        </View>
                      </View>
                    </View>
                  </View>
                </Paper>
              </View>
            ))}


          </View>
        </MainContainer>
      </ScrollView>


      <View style={styles.footerMenu}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 20, }}>
          <Button
            title={cartCategoryItems + " Items"}
            primary lg raised
            iconRight
            onPress={() => cartCategoryItems != 0 && navigation.navigate('Cart')}
            icon={
              <Image
                style={{ tintColor: colors.white, marginTop: 4, marginLeft: 10 }}
                source={require('../../../assets/images/icons/right.png')}
              />
            }
          />
        </View>
      </View>

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
    position: 'absolute', bottom: 0, left: 0, right: 0
  },


})
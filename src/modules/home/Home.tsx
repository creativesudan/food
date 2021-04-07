import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ripple from 'react-native-material-ripple';

import RBSheet from 'react-native-raw-bottom-sheet';
import MainContainer from '../../components/Containers/Main';
import { Icon, Divider, ListItem, CheckBox } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
// import Carousel from 'react-native-snap-carousel';
import { ScrollView } from "react-native-gesture-handler";
import { MenuModal } from "../modal/Menu";
import { LoactionPermission } from "../modal/LoactionPermission";
import SearchView from "../modal/SearchView";
import { ReviewRate } from "../modal/ReviewRate";
import Slider from "./Slider";

import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, fetchAllProducts, fetchSliderImages } from "../../redux/actions/home";
import AddProduct from "../global/AddProduct";
import agent from "../../agent";

import Permissions, { PERMISSIONS, RESULTS } from 'react-native-permissions'
import SearchBar from "../global/SearchBar";


const data = [
  { id: 'a', name: 'Snacks', image: require('../../../assets/images/server_icons/snack.png') },
  { id: 'b', name: 'Sweets', image: require('../../../assets/images/server_icons/sweets.png') },
  { id: 'c', name: 'Cakes', image: require('../../../assets/images/server_icons/cake.png') },
  { id: 'd', name: 'Namken', image: require('../../../assets/images/server_icons/namkeen.png') },
  { id: 'e', name: 'Biscuits', image: require('../../../assets/images/server_icons/biscuits.png') },
  { id: 'f', name: 'Others', image: require('../../../assets/images/server_icons/ice-cream.png') },
];


const exclusive = [
  { id: 'a', label: 'Gulab Jamun', saleP: 295, oldP: 295, unit: 'Kg', image: require('../../../assets/images/mock_data/banner_1.png') },
  { id: 'b', label: 'Cinnamon Toast', saleP: 295, oldP: 295, unit: 'Kg', image: require('../../../assets/images/mock_data/banner_1.png') },
  { id: 'c', label: 'Gulab Jamun', saleP: 295, oldP: 295, unit: 'Kg', image: require('../../../assets/images/mock_data/banner_1.png') },
  { id: 'd', label: 'Cinnamon Toast', saleP: 295, oldP: 295, unit: 'Kg', image: require('../../../assets/images/mock_data/banner_1.png') },
  { id: 'e', label: 'Gulab Jamun', saleP: 295, oldP: 295, unit: 'Kg', image: require('../../../assets/images/mock_data/banner_1.png') },
];


export default function HomeView({ navigation }) {

  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [loactionPermission, setLoactionPermission] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [reviewRate, setReviewRate] = useState(false);

  const [qty, setQty] = useState(0);
  const AssetsDrawer = useRef<RBSheet>(null);

  const dispatch = useDispatch();
  const categories = useSelector(state => state.home.categories || []);
  const deliveryAddress = useSelector(state => state.app.address || {});
  const cartItemsCount = useSelector(state => state.cart.items.reduce((total, obj) => total + obj.qty, 0));
  const allProducts = useSelector(state => state.home.allProducts || []);
  const cartItems = useSelector(state => state.cart.items);
  const sliderImages = useSelector(state => state.home.sliderImages || []);
  const [addProduct, setAddProduct] = useState({});

  const exclusiveProducts = allProducts.filter(item => parseInt(item.showhome) == 1);


  const getProductById = (id) => {
    if (!allProducts || allProducts.length == 0) return {};
    return allProducts.find(item => item.pro_id == id) || {};
  }

  const getCartItemById = (id) => {
    const product = getProductById(id);
    let initialCartItem = {}
    if (product && product.price_weight) {
      initialCartItem = { qty: 0, variant: product.price_weight[0] || {}, id: id, product: product };
    }

    if (!cartItems) return initialCartItem;
    const items = cartItems.find(item => item.id == id) || initialCartItem;

    return items;
  }

  const updateCart = (item) => {
    dispatch({ type: "CART_PRODUCT_UPDATED", payload: item })
  }

  useEffect(() => {
    dispatch(fetchCategories());
    if (!allProducts || allProducts.length == 0) dispatch(fetchAllProducts());
    if (sliderImages.length == 0) dispatch(fetchSliderImages());
  }, []);

  useEffect(() => {
    Permissions.check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(response => {
      if (response !== RESULTS.GRANTED) {
        setLoactionPermission(true);
      }
    });

  }, [])

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

      {menuModalVisible && <MenuModal setMenuModalVisible={setMenuModalVisible} navigation={navigation} />}
      {loactionPermission && <LoactionPermission setLoactionPermission={setLoactionPermission} />}
      {searchModalVisible && <SearchView setSearchModalVisible={setSearchModalVisible} navigation={navigation} />}
      {reviewRate && <ReviewRate setReviewRate={setReviewRate} />}




      <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: colors.bodyBase }}>

        <View style={{ backgroundColor: colors.bodyBase }}>
          <View style={styles.header}>
            <View style={styles.fakeBg}></View>
            <MainContainer>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={{ flex: 1 }}>
                  <Text h1 color={colors.white}>Bobby Sweets</Text>
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
          <View />
        </View>

        {/* inner body start here*/}
        <View style={{ flexGrow: 1, backgroundColor: '#fff' }}>

          <View style={{ backgroundColor: '#888', flexDirection: 'column', flex: 1 }}>
            <ScrollView style={{ backgroundColor: colors.bodyBase, flexGrow: 1 }}>











              <View style={{ height: 55, marginBottom: -55, backgroundColor: colors.primary }} />
              <MainContainer>

                <View style={styles.banner}>
                  <Slider images={sliderImages} key={sliderImages} />
                </View>


                <View style={styles.flexContainer}>
                  {categories.map(item => (
                    <View style={styles.flexList}>
                      <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', }}>
                          <Paper style={{ flex: 1 }}>
                            <Ripple style={{ width: '100%' }} onPress={() => navigation.navigate('Category', { "category": item })}>
                              <View style={{ marginTop: 16, marginBottom: 12, alignItems: 'center' }}>
                                <View style={{ width: 50, alignItems: 'center', }}><Image
                                  style={{ height: 54, width: 54 }}
                                  source={{
                                    uri: agent.MEDIA_ROOT + '/category/' + item.icon
                                  }} /></View>
                                <Text caption hCenter style={styles.label}>{item.name}</Text>
                              </View>
                            </Ripple>
                          </Paper>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>

                {exclusiveProducts.length > 4 && <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginRight: -10 }}>
                  <Text style={{ flex: 1 }}>Bobby Exclusive</Text>
                  <Button title="View All" link white onPress={() => navigation.navigate('ProductList', { products: exclusiveProducts })} />
                </View>}

                <View style={{ marginLeft: -5, marginRight: -15 }}>
                  <ScrollView horizontal={true}>
                    {exclusiveProducts.map(item => (
                      <View style={{ marginBottom: 10, width: 140, marginHorizontal: 5 }}>
                        <Paper>
                          <Image style={{ width: '100%', height: 60, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                            source={{
                              uri: item.image,
                            }}
                          />

                          <View style={{ padding: 10 }}>
                            <Text>{item.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image style={{ height: 10, marginRight: 4 }}
                                source={require('../../../assets/images/icons/rupee.png')}
                              />
                              <Text p color={colors.primary}>{item.price_weight.length != 0 ? item.price_weight[0].price : "NA"} / {item.price_weight.length != 0 ? item.price_weight[0].weight : "NA"}</Text>
                              <Text p style={{ marginLeft: 5, textDecorationLine: 'line-through' }}>{item.price_weight.length != 0 ? item.price_weight[0].mrp : "NA"} </Text>
                            </View>

                            <View style={{ height: 34, overflow: 'hidden', marginTop: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary, borderRadius: 100 }}>

                              {getCartItemById(item.pro_id).qty <= 0 && <Text onPress={() => {
                                setAddProduct({ ...addProduct, id: item.pro_id });
                                AssetsDrawer.current?.open();
                              }} hCenter style={{ flex: 1, fontSize: 14 }}>Add</Text>}
                              {(getCartItemById(item.pro_id).qty > 0) && <>
                                <IconButton
                                  white noBorder mdR
                                  onPress={() => {
                                    const cartItem = getCartItemById(item.pro_id);
                                    updateCart({ ...cartItem, qty: (cartItem.qty <= 0 ? 0 : cartItem.qty - 1) })
                                  }}
                                  icon={<Image source={require('../../../assets/images/icons/minus.png')} />}
                                />

                                <Text hCenter style={{ flex: 1, fontSize: 14 }}>{getCartItemById(item.pro_id).qty <= 0 ? 0 : getCartItemById(item.pro_id).qty}</Text>
                                <IconButton
                                  white noBorder mdR
                                  onPress={() => {
                                    setAddProduct({ ...addProduct, id: item.pro_id });
                                    AssetsDrawer.current?.open();
                                  }}
                                  icon={
                                    <Image source={require('../../../assets/images/icons/plus.png')} />
                                  }
                                />
                              </>}
                            </View>

                          </View>
                        </Paper>
                      </View>
                    ))}
                  </ScrollView>
                </View>



              </MainContainer>







            </ScrollView>
          </View>

        </View>
        {/* inner body end here*/}


        {/* footer start here */}
        <Paper>

          <View style={styles.footerMenu}>
            <View style={styles.menuList}>
              <Ripple onPress={() => navigation.navigate('My Account')}>
                <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 10 }}>
                  <Image source={require('../../../assets/images/icons/account.png')} />
                  <Text hCenter style={{ fontSize: 12 }}>My Account</Text>
                </View>
              </Ripple>
            </View>
            <View style={styles.menuList}>
              <Ripple onPress={() => navigation.navigate('Order List')}>
                <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 10 }}>
                  <Image source={require('../../../assets/images/icons/orders.png')} />
                  <Text hCenter style={{ fontSize: 12 }}>Orders</Text>
                </View>
              </Ripple>
            </View>

            <View style={styles.menuList}>
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: -50 }}>
                <IconButton
                  primary lgR
                  onPress={() => {
                    setMenuModalVisible(true);
                  }}
                  // noBorder 
                  icon={
                    <Image source={require('../../../assets/images/icons/menu.png')} />
                  }
                />
              </View>
            </View>

            <View style={styles.menuList}>
              <Ripple>
                <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 10 }}>
                  <Image source={require('../../../assets/images/icons/offer.png')} />
                  <Text hCenter style={{ fontSize: 12 }}>Offers</Text>
                </View>
              </Ripple>
            </View>
            <View style={styles.menuList}>
              <Ripple>
                <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 10 }}>
                  <Image source={require('../../../assets/images/icons/call.png')} />
                  <Text hCenter style={{ fontSize: 12 }}>Call</Text>
                </View>
              </Ripple>
            </View>
          </View>
        </Paper>
        {/* footer end here */}

      </View>




    </>
  )
}


const styles = StyleSheet.create({
  bodyBase: {
    flexGrow: 1,
  },
  fakeBg: {
    backgroundColor: colors.primary,
    width: '100%',
    padding: 20, flex: 1,
    position: 'absolute',
    top: 0,
  },
  header: {
    backgroundColor: colors.primary,
    paddingBottom: 50, marginBottom: -50,
  },
  banner: {
    borderRadius: 5,
    // overflow: 'hidden',
  },
  flexContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10, marginHorizontal: -10
  },
  flexList: {
    flexBasis: '33.3%',
    padding: 10,
    alignItems: 'center',
  },
  label: {
    marginTop: 4
  },
  footerMenu: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white
  },
  menuList: {
    flexBasis: '20%',
  }


})
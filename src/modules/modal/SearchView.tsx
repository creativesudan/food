import React, { useState, useRef, useEffect } from 'react';
import Ripple from 'react-native-material-ripple';
import { StyleSheet, View, Modal, Image, TextInput } from 'react-native';
import { Avatar, Divider, SearchBar, Icon, ListItem } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';

import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../styles';
import MainContainer from '../../components/Containers/Main';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';

import { useSelector, useDispatch } from "react-redux";
import agent from "../../agent";
import RBSheet from 'react-native-raw-bottom-sheet';
import AddProduct from "../global/AddProduct";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { removeFromCart } from "../../redux/actions/cart";




export const SearchView = ({
  setSearchModalVisible, navigation
}: {
  setSearchModalVisible: (state: boolean) => void;
  navigation: object;

}) => {
  const [searchVal, setSearch] = useState("");
  const dispatch = useDispatch();
  const [results, setResults] = useState({ count: 0 });
  const categories = useSelector(state => state.home.categories || []);
  const allProducts = useSelector(state => state.home.allProducts || []);

  const cartItems = useSelector(state => state.cart.items);
  const [addProduct, setAddProduct] = useState({});
  const [pastSearches, setPastSearches] = useState([]);
  const AssetsDrawer = useRef<RBSheet>(null);
  const cart = useSelector(state => state.cart);
  const SEARCH_LEN = 2;
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

    return { ...items };
  }

  const updateCart = (item) => {
    dispatch({ type: "CART_PRODUCT_ADDED", payload: item })
  }

  const removeCart = (item) => {
    dispatch(removeFromCart(item))
  }

  const search = (keyword) => {
    setSearch(keyword);

    if (keyword.length <= SEARCH_LEN) {
      setResults({ count: 0 });
      return;
    }
    let productResults = [];
    let categoryResults = [];
    if (categories) {
      categories.map(cat => {
        if (cat.name.toLowerCase().includes(keyword.toLowerCase())) {
          categoryResults.push(cat)
        }
      });
    }

    if (allProducts) {
      allProducts.map(prod => {
        if (prod.name.toLowerCase().includes(keyword.toLowerCase())) {
          productResults.push(prod)
        }
      });
    }

    let results = {
      product: productResults,
      category: categoryResults,
      count: (productResults.length + categoryResults.length)
    };

    try {

      results.product.map(product => {
        if (!pastSearches.includes(product.name))
          setPastSearches([product.name, ...pastSearches]);
      });

      results.category.map(category => {
        if (!pastSearches.includes(category.name))
          setPastSearches([category.name, ...pastSearches]);
      });

      console.log(pastSearches);


    } catch (e) {
      console.log(e);
    }

    setResults(results);
    console.log(results);
  }

  useEffect(() => {
    try {
      AsyncStorage.getItem('past_searches').then((result) => {

        if (result) {
          setPastSearches(JSON.parse(result));
        }

      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      AsyncStorage.setItem('past_searches', JSON.stringify(pastSearches));
    } catch (e) {
      console.log(e);
    }
  }, [pastSearches]);

  return (

    <View>
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

      <Modal animationType="slide" transparent visible>


        <View style={{ backgroundColor: '#FFFCFC', flexGrow: 1 }}>
          <ScrollView>



            {/* search bar end */}
            <View style={{ flexGrow: 1, }}>
              <View style={{
                flexDirection: 'row', backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 4, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,

              }}>

                <IconButton
                  white noBorder lgR
                  onPress={() => { setSearchModalVisible(false); }}
                  icon={
                    <Image
                      style={{ width: 16, height: 16, tintColor: colors.primary }}
                      source={require('../../../assets/images/icons/back.png')}
                    />
                  }
                />

                <View style={{ flex: 1 }}>
                  <TextInput
                    autoFocus={true}
                    style={styles.input}
                    onChangeText={search}
                    value={searchVal}
                    placeholder="Search here..."
                    keyboardType="default"
                  />
                </View>
                <IconButton
                  white lgR noBorder
                  onPress={() => {
                    search("");
                  }}
                  icon={
                    <Image
                      style={{ width: 16, height: 16 }}
                      source={require('../../../assets/images/icons/close.png')}
                    />
                  }
                />
              </View>

              <MainContainer>
                {(results.count <= 0 && searchVal.length > SEARCH_LEN) && (
                  <View style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center', marginTop: 100 }}>
                    <Image source={require('../../../assets/images/pages/no_search.png')} />
                    <Text h3 style={{ marginBottom: 4 }}>Don't have any items</Text>
                    <Text style={{ fontSize: 12, color: '#9196A9' }}>Unable to find any products </Text>
                  </View>)}

                {results.product && results.product.length > 0 && results.product.map(product => (
                  <View style={{ marginVertical: 5 }}>
                    <Paper>
                      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 78, height: 78, borderRadius: 5 }}
                          source={{ uri: product.image }}
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
                              <Image style={{ height: 10, marginRight: 4 }}
                                source={require('../../../assets/images/icons/rupee.png')}
                              />
                              <Text color={colors.primary}>{product.price_weight[0].price} / {product.price_weight[0].weight}</Text>
                              <Text style={{ marginLeft: 10, textDecorationLine: 'line-through' }}>{product.price_weight[0].mrp}</Text>
                            </View>
                            <View style={{ width: 80 }}>

                              <View style={{ marginTop: 5, height: 32, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary, borderRadius: 100 }}>
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
                                    icon={<Image source={require('../../../assets/images/icons/minus.png')} />}
                                  />

                                  <Text hCenter style={{ flex: 1, fontSize: 14 }}>{cart.countByProduct(product.pro_id)}</Text>
                                  <IconButton
                                    white noBorder mdR
                                    onPress={() => {
                                      setAddProduct({ ...addProduct, id: product.pro_id });
                                      AssetsDrawer.current?.open();
                                    }}
                                    icon={
                                      <Image source={require('../../../assets/images/icons/plus.png')} />
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

                {results.category && results.category.length > 0 && (<View style={{ marginTop: 20 }}>
                  <View>
                    <Text label style={{ marginBottom: 10 }}>Categories</Text>
                    {results.category.map(category => (
                      <ListItem bottomDivider containerStyle={{ backgroundColor: 'transparent', paddingVertical: 10, paddingHorizontal: 0 }} onPress={() => { setSearchModalVisible(false); navigation.navigate('Category', { "category": category }); }}>
                        <ListItem.Content>
                          <ListItem.Title>
                            <Text p>{category.name}</Text>
                          </ListItem.Title>
                        </ListItem.Content>
                      </ListItem>
                    ))}

                  </View>
                </View>)}

                {searchVal.length <= SEARCH_LEN &&
                  (
                    <View style={{ marginTop: 20 }}>
                      <View>
                        <Text label style={{ marginBottom: 10 }}>Past Searches</Text>
                        {pastSearches.map(item => (
                          <ListItem bottomDivider containerStyle={{ backgroundColor: 'transparent', paddingVertical: 10, paddingHorizontal: 0 }} onPress={() => search(item)}>
                            <ListItem.Content>
                              <ListItem.Title>
                                <Text p>{item}</Text>
                              </ListItem.Title>
                            </ListItem.Content>
                          </ListItem>
                        ))}
                      </View>

                      <View style={{ marginTop: 20 }}>
                        <Text label>Popular Categories</Text>
                        <Paper style={{ marginVertical: 10 }}>
                          <ScrollView horizontal={true} style={{ marginHorizontal: 5, marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              {categories && categories.map(category => <Ripple style={styles.item} onPress={() => { setSearchModalVisible(false); navigation.navigate('Category', { "category": category }); }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center', marginHorizontal: 5 }}>
                                  <Image
                                    style={{ width: 28, height: 28 }}
                                    source={{
                                      uri: agent.MEDIA_ROOT + '/category/' + category.icon
                                    }}
                                  />
                                  <Text p>{category.name}</Text>
                                </View>
                              </Ripple>)}

                            </View>
                          </ScrollView>
                        </Paper>
                      </View>

                    </View>
                  )}



              </MainContainer>




            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column', flex: 1, alignItems: 'center',
    paddingVertical: 10
  },
  divider: {
    position: 'relative',
    top: 8,
  },
  headTitle: {
    color: colors.white,
    marginBottom: 10,
    marginTop: 16,
  },
  list: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  Avtar: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  input: {
    height: 54
  },
});


export default SearchView;
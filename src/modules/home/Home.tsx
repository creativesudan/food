import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ripple from 'react-native-material-ripple';

import RBSheet from 'react-native-raw-bottom-sheet';
import MainContainer from '../../components/Containers/Main';
import { SearchBar, Icon, Divider, ListItem, CheckBox } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from "react-native-gesture-handler";
import { MenuModal } from "../modal/Menu";
import { LoactionPermission } from "../modal/LoactionPermission";
import SearchView from "../modal/SearchView";
import { ReviewRate } from "../modal/ReviewRate";
import Slider from "./Slider";

import { useSelector, useDispatch } from "react-redux";
import { fetch_categories } from "../../redux/actions/home";


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
  const [loactionPermission, setLoactionPermission] = useState(true);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [reviewRate, setReviewRate] = useState(false);

  const [qty, setQty] = useState(0);
  const AssetsDrawer = useRef<RBSheet>(null);

  const dispatch = useDispatch();
  const categories = useSelector(state => state.home.categories || []);

  useEffect(() => {
    dispatch(fetch_categories());
  }, []);

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
        <MainContainer>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text h3>Special Laddoo</Text>
              <Text p color={colors.grey2}>Special Laddoo</Text>
            </View>
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View>
            <Text h3>Select Your Quantity</Text>
            <Text p color={colors.grey2}>Please select any one option</Text>
          </View>

          <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 10, backgroundColor: 'transparent' }}>
            <ListItem.Content>
              <Text >250 Gram</Text>
            </ListItem.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                containerStyle={{ marginRight: 0, marginVertical: 0, padding: 0, }}
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={colors.primary}
                checked={true}
              />
            </View>

          </ListItem>

          <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 5, backgroundColor: 'transparent' }}>
            <ListItem.Content>
              <Text>250 Gram</Text>
            </ListItem.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ height: 10, marginRight: 4 }}
                source={require('../../../assets/images/icons/rupee.png')}
              />
              <Text >500.00</Text>
              <CheckBox
                containerStyle={{ marginRight: 0, marginVertical: 0, padding: 0, }}
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={colors.primary}
              // checked={this.state.checked}
              />
            </View>
          </ListItem>

          <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 5, backgroundColor: 'transparent' }}>
            <ListItem.Content>
              <Text >1 Kg</Text>
            </ListItem.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ height: 10, marginRight: 4 }}
                source={require('../../../assets/images/icons/rupee.png')}
              />
              <Text >397.00</Text>
              <CheckBox
                containerStyle={{ marginRight: 0, marginVertical: 0, padding: 0, }}
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={colors.primary}
              // checked={this.state.checked}
              />
            </View>
          </ListItem>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>

            <View>
              <View style={{ width: 100, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary, borderRadius: 100 }}>
                <IconButton
                  white noBorder mdR
                  onPress={() => {
                    setQty(qty <= 0 ? 0 : qty - 1);
                  }}
                  icon={<Image source={require('../../../assets/images/icons/minus.png')} />}
                />

                <Text hCenter style={{ flex: 1, fontSize: 14 }}>{qty <= 0 ? 'Add' : qty}</Text>
                <IconButton
                  white noBorder mdR
                  onPress={() => {
                    setQty(qty + 1);
                    AssetsDrawer.current?.open();
                  }}
                  icon={
                    <Image source={require('../../../assets/images/icons/plus.png')} />
                  }
                />
              </View>
            </View>
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Button title="Add 133" md primary
                onPress={() => {
                  AssetsDrawer.current?.close();
                }}
              />
            </View>
          </View>

        </MainContainer>

      </RBSheet>

      {menuModalVisible && <MenuModal setMenuModalVisible={setMenuModalVisible} />}
      {loactionPermission && <LoactionPermission setLoactionPermission={setLoactionPermission} />}
      {searchModalVisible && <SearchView setSearchModalVisible={setSearchModalVisible} />}
      {reviewRate && <ReviewRate setReviewRate={setReviewRate} />}
      <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: colors.bodyBase }}>
        <View style={{ backgroundColor: colors.bodyBase }}>
          <View style={styles.header}>
            <View style={styles.fakeBg}></View>
            <MainContainer>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('Delivery Location')}>
                    <Text color={colors.white}>Deliver to :</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text bold color={colors.white}>11th Ave, Gaur City 2, Ghaziabad</Text>
                      <Image style={{ tintColor: colors.white, marginLeft: 5 }}
                        source={require('../../../assets/images/icons/expand_more.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <Ripple style={{ padding: 10 }}
                  onPress={() => navigation.navigate('Cart')}
                >
                  <Text style={{
                    position: 'absolute', zIndex: 1, right: 2, top: 2,
                    backgroundColor: colors.secondary,
                    borderRadius: 20, width: 20, height: 20,
                    lineHeight: 20, fontSize: 10
                  }} hCenter>02</Text>
                  <Image style={{}}
                    source={require('../../../assets/images/icons/cart.png')}
                  />
                </Ripple>


              </View>


              <View style={{ marginVertical: 10 }}>
                <Ripple onPress={() => setSearchModalVisible(true)}>
                  <View style={{ borderRadius: 8, height: 34, alignItems: 'center', paddingHorizontal: 12, flexDirection: 'row', backgroundColor: colors.white }}>
                    <Icon
                      type='evilicon'
                      name='search'
                      color='#F9C5C5'
                    />
                    <Text p style={{ margineLeft: 10 }}>Search product (eg. rasgulla)</Text>
                  </View>
                </Ripple>


              </View>

            </MainContainer>

          </View>
          <View />
          <ScrollView >

            <MainContainer>
              <View style={styles.banner}>
                <Slider />
                {/* <Image style={{width: '100%', borderRadius: 5}}
            source={require('../../../assets/images/mock_data/banner_1.png')}
          /> */}
              </View>

              <View style={styles.flexContainer}>
                {categories.map(item => (
                  <View style={styles.flexList}>
                    <View style={{ width: '100%' }}>
                      <View style={{ flexDirection: 'row', }}>
                        <Paper style={{ flex: 1 }}>
                          <Ripple style={{ width: '100%' }} onPress={() => navigation.navigate('Category')}>
                            <View style={{ marginTop: 7, marginBottom: 12, alignItems: 'center' }}>
                              <View style={{ width: 50, alignItems: 'center', }}><Image source={{
                                uri: item.image,
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

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginRight: -10 }}>
                <Text style={{ flex: 1 }}>Bobby Excuslive</Text>
                <Button title="View All" link white />
              </View>

              <View style={{ marginLeft: -5, marginRight: -15 }}>
                <ScrollView horizontal={true}>
                  {exclusive.map(item => (
                    <View style={{ marginBottom: 10, width: 140, marginHorizontal: 5 }}>
                      <Paper>
                        <Image style={{ width: '100%', height: 60, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                          source={require('../../../assets/images/mock_data/banner_1.png')}
                        />

                        <View style={{ padding: 10 }}>
                          <Text>{item.label}</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 10, marginRight: 4 }}
                              source={require('../../../assets/images/icons/rupee.png')}
                            />
                            <Text p color={colors.primary}>{item.saleP} {item.unit}</Text>
                            <Text p style={{ marginLeft: 5, textDecorationLine: 'line-through' }}>{item.oldP} {item.unit}</Text>
                          </View>

                          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary, borderRadius: 100 }}>

                            <IconButton
                              white noBorder mdR
                              onPress={() => {
                                setQty(qty <= 0 ? 0 : qty - 1);
                              }}
                              icon={<Image source={require('../../../assets/images/icons/minus.png')} />}
                            />

                            <Text hCenter style={{ flex: 1, fontSize: 14 }}>{qty <= 0 ? 'Add' : qty}</Text>
                            <IconButton
                              white noBorder mdR
                              onPress={() => {
                                setQty(qty + 1);
                                AssetsDrawer.current?.open();
                              }}
                              icon={
                                <Image source={require('../../../assets/images/icons/plus.png')} />
                              }
                            />
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
                primary raised lgR
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
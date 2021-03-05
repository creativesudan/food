import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, SafeAreaView } from 'react-native';
import Ripple from 'react-native-material-ripple';

import RBSheet from 'react-native-raw-bottom-sheet';
import MainContainer from '../../components/Containers/Main';
import { SearchBar, Avatar, Icon, Divider, ListItem, CheckBox } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from "react-native-gesture-handler";
import { MenuModal } from "../modal/Menu";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/home";


export default function AddProduct({
    AssetsDrawer, product, setProduct, InitialCartItem
}: {
    AssetsDrawer: (state: boolean) => void;
    product: object;
    setProduct: (cartItem: object) => void;
    InitialCartItem: object;
}) {

    const [cartItem, setCartItem] = useState(InitialCartItem);
    console.log(product);

    return (

        <MainContainer>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Text h3>{product.name}</Text>
                    <Text p color={colors.grey2}>{product.description}</Text>
                </View>
            </View>
            <Divider style={{ marginVertical: 10 }} />
            <View>
                <Text h3>Select Your Quantity</Text>
                <Text p color={colors.grey2}>Please select any one option</Text>
            </View>
            {product.price_weight && product.price_weight.map(item =>
                <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 10, backgroundColor: 'transparent' }}>
                    <ListItem.Content>
                        <Text >{item.weight}</Text>
                    </ListItem.Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 10, marginRight: 4 }}
                            source={require('../../../assets/images/icons/rupee.png')}
                        />
                        <Text>{item.price}</Text>
                        <CheckBox
                            containerStyle={{ marginRight: 0, marginVertical: 0, padding: 0, }}
                            iconRight
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checkedColor={colors.primary}
                            checked={cartItem.variant.id == item.id}
                            onPress={() => setCartItem({ ...cartItem, variant: item })}
                        />
                    </View>

                </ListItem>
            )}

            {/* <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 5, backgroundColor: 'transparent' }}>
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
            </ListItem> */}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>

                <View>
                    <View style={{ width: 100, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary, borderRadius: 100 }}>
                        <IconButton
                            white noBorder mdR
                            onPress={() => setCartItem({ ...cartItem, qty: cartItem.qty <= 0 ? 0 : cartItem.qty - 1 })}
                            icon={<Image source={require('../../../assets/images/icons/minus.png')} />}
                        />

                        <Text hCenter style={{ flex: 1, fontSize: 14 }}>{cartItem.qty <= 0 ? 'Add' : cartItem.qty}</Text>
                        <IconButton
                            white noBorder mdR
                            onPress={() => setCartItem({ ...cartItem, qty: cartItem.qty + 1 })}
                            icon={
                                <Image source={require('../../../assets/images/icons/plus.png')} />
                            }
                        />
                    </View>
                </View>
                <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Button title="Add" md primary
                        onPress={() => {
                            AssetsDrawer.current?.close();
                            if (cartItem.qty == 0) cartItem.qty = 1;
                            setProduct(cartItem);
                        }}
                    />
                </View>
            </View>

        </MainContainer>

    );
}
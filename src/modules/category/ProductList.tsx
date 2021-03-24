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


export default function ProductListView({ route, navigation }) {

    const [qty, setQty] = useState(0);
    const [addProduct, setAddProduct] = useState({});
    const AssetsDrawer = useRef<RBSheet>(null);
    const dispatch = useDispatch();
    const { products } = route.params;
    const categories = useSelector(state => state.home.categories || []);
    const deliveryAddress = useSelector(state => state.app.address || {});
    const cartItems = useSelector(state => state.cart.items);
    const cartItemsCount = useSelector(state => state.cart.items.reduce((total, obj) => total + obj.qty, 0));

    const getProductById = (id) => {
        if (!products) return {};
        return products.find(item => item.pro_id == id) || {};
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
                            <TouchableOpacity onPress={() => navigation.navigate('Delivery Location')}>
                                <Text color={colors.white}>Deliver to :</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text bold color={colors.white}>{deliveryAddress.name || "Select Address"}</Text>
                                    <Image style={{ tintColor: colors.white, marginLeft: 5 }}
                                        source={require('../../../assets/images/icons/expand_more.png')}
                                    />
                                </View>
                            </TouchableOpacity>
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



            <ScrollView>

                <MainContainer>
                    <View style={{ marginBottom: 70 }}>
                        {products.map(product => (
                            <View style={{ marginVertical: 5 }} key={product.pro_id}>
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
                                                                    updateCart({ ...cartItem, qty: (cartItem.qty <= 0 ? 0 : cartItem.qty - 1) })
                                                                }}
                                                                icon={<Image source={require('../../../assets/images/icons/minus.png')} />}
                                                            />

                                                            <Text hCenter style={{ flex: 1, fontSize: 14 }}>{getCartItemById(product.pro_id).qty <= 0 ? 0 : getCartItemById(product.pro_id).qty}</Text>
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


                    </View>
                </MainContainer>
            </ScrollView>


            <View style={styles.footerMenu}>
                <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 20, }}>

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
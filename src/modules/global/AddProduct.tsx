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
import AddLastProduct from "./AddLastProduct"
import AddNewProduct from "./AddNewProduct";


export default function AddProduct({
    AssetsDrawer, product, setProduct, InitialCartItem
}: {
    AssetsDrawer: (state: boolean) => void;
    product: object;
    setProduct: (cartItem: object) => void;
    InitialCartItem: object;
}) {

    const [cartItem, setCartItem] = useState(InitialCartItem);
    const [addNew, setAddNew] = useState(InitialCartItem.qty == 0);
    console.log(product);

    return InitialCartItem.qty == 0 ?
        (

            <AddNewProduct product={product} setProduct={setProduct} InitialCartItem={InitialCartItem} AssetsDrawer={AssetsDrawer} />

        ) :
        !addNew ?
            <AddLastProduct product={product} setProduct={setProduct} InitialCartItem={InitialCartItem} AssetsDrawer={AssetsDrawer} setAddNew={setAddNew} />
            :
            <AddNewProduct product={product} setProduct={setProduct} InitialCartItem={{ qty: 0, variant: product.price_weight.length > 0 ? product.price_weight[0] : {}, id: product.pro_id, product: product }} AssetsDrawer={AssetsDrawer} />
}
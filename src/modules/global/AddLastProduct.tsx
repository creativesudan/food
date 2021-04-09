import React, { useState } from "react";
import { View, Image } from 'react-native';
import MainContainer from '../../components/Containers/Main';
import { Divider, ListItem, CheckBox } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import { colors } from '../../styles';
import AddProduct from "./AddProduct";


export default function AddLastProduct({
    AssetsDrawer, product, setProduct, InitialCartItem, setAddNew
}: {
    AssetsDrawer: (state: boolean) => void;
    product: object;
    setProduct: (cartItem: object) => void;
    InitialCartItem: object;
    setAddNew: (addNew: boolean) => void;
}) {

    const [cartItem, setCartItem] = useState(InitialCartItem);
    console.log(product);

    return (

        <MainContainer>
            <Text h3>Repeat last used customization?</Text>
            <Divider style={{ marginVertical: 10 }} />


            <ListItem containerStyle={{ paddingHorizontal: 0, paddingVertical: 10, backgroundColor: 'transparent' }}>
                <ListItem.Content>
                    <Text >{product.name} - {cartItem.variant.weight}</Text>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 10, marginRight: 4 }}
                                source={require('../../../assets/images/icons/rupee.png')}
                            />
                            <Text>{item.price}</Text>
                        </View> */}
                </ListItem.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ height: 10, marginRight: 4 }}
                        source={require('../../../assets/images/icons/rupee.png')}
                    />
                    <Text>{cartItem.variant.mrp}</Text>
                </View>

            </ListItem>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15, marginTop: 50 }}>

                <View style={{ flex: 1, }}>
                    <Button title="Add New" md primary secondary
                        onPress={() => {
                            setAddNew(true);
                        }}
                    />
                </View>

                <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Button title="Repeat Last" md primary
                        onPress={() => {
                            AssetsDrawer.current?.close();
                            cartItem.qty = 1;
                            setProduct(cartItem);
                        }}
                    />
                </View>
            </View>

        </MainContainer>

    );
}
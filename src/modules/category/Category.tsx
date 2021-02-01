import React, { useState, useCallback, useRef } from "react";
import {View, StyleSheet,Image,Dimensions, SafeAreaView} from 'react-native';
import Ripple from 'react-native-material-ripple';

import RBSheet from 'react-native-raw-bottom-sheet';
import MainContainer from '../../components/Containers/Main';
import { SearchBar, Avatar, Icon,Divider,ListItem,CheckBox } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from "react-native-gesture-handler";
import { MenuModal } from "../modal/Menu";


const item = [
  {id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295},
  {id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295},
  {id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295},
  {id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295},
  {id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295},
  {id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295},
  {id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295},
  {id: 'a', title: 'Nut Butter Dream Bars', veg: true, disPrice: 270, oldPrice: 295},
]


const data = [
  {id: 'b', label: 'Sweets', image: require('../../../assets/images/server_icons/sweets.png')},
  {id: 'c', label: 'Cakes', image: require('../../../assets/images/server_icons/cake.png')},
  {id: 'd', label: 'Namken', image: require('../../../assets/images/server_icons/namkeen.png')},
  {id: 'e', label: 'Biscuits', image: require('../../../assets/images/server_icons/biscuits.png')},
  {id: 'f', label: 'Others', image: require('../../../assets/images/server_icons/ice-cream.png')},
];


export default function CategoryView({navigation}) {
  
const [qty, setQty] = useState(0);
const AssetsDrawer = useRef<RBSheet>(null);

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
      <View style={{position: 'absolute', top:10, zIndex:1, right:10}}>
      <IconButton
        white noBorder mdR
        onPress={() => {
          AssetsDrawer.current?.close()
        }}
        icon={
          <Image style={{width:14}} source={require('../../../assets/images/icons/close.png')}/>
        }
      />
      </View>
        <MainContainer>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <View style={{flex:1}}>
            <Text h3>Special Laddoo</Text>
            <Text p color={colors.grey2}>Special Laddoo</Text>
          </View>
        </View>
        <Divider style={{marginVertical:10}}/>
          <View>
            <Text h3>Select Your Quantity</Text>
            <Text p color={colors.grey2}>Please select any one option</Text>
          </View>
          
          <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:10, backgroundColor: 'transparent'}}>
            <ListItem.Content>
              <Text >250 Gram</Text>
            </ListItem.Content>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                containerStyle={{ marginRight: 0, marginVertical:0, padding:0, }}
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={colors.primary}
                checked={true}
              />
            </View>
            
          </ListItem>
          
          <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:5, backgroundColor: 'transparent'}}>
            <ListItem.Content>
              <Text>250 Gram</Text>
            </ListItem.Content>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{height:10, marginRight:4}}
                  source={require('../../../assets/images/icons/rupee.png')}
                />
              <Text >500.00</Text>
              <CheckBox
                containerStyle={{ marginRight: 0, marginVertical:0, padding:0, }}
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={colors.primary}
                // checked={this.state.checked}
              />
            </View>
          </ListItem>
          
          <ListItem containerStyle={{paddingHorizontal:0, paddingVertical:5, backgroundColor: 'transparent'}}>
            <ListItem.Content>
              <Text >1 Kg</Text>
            </ListItem.Content>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{height:10, marginRight:4}}
                  source={require('../../../assets/images/icons/rupee.png')}
                />
              <Text >397.00</Text>
              <CheckBox
                containerStyle={{ marginRight: 0, marginVertical:0, padding:0, }}
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={colors.primary}
                // checked={this.state.checked}
              />
            </View>
          </ListItem>

          <View style={{flexDirection:'row', alignItems: 'center', marginVertical:15}}>
            
            <View>
              <View style={{ width:100, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary,borderRadius: 100}}>
              <IconButton
                white noBorder mdR
                onPress={() => {
                  setQty(qty <=0 ? 0: qty-1);
                }}
                icon={ <Image source={require('../../../assets/images/icons/minus.png')}/>}
              />
              
              <Text hCenter style={{flex:1, fontSize: 14}}>{qty <= 0 ? 'Add'  : qty}</Text>
              <IconButton
                white noBorder mdR
                onPress={() => {
                  setQty(qty+1);
                  AssetsDrawer.current?.open();
                }}
                icon={
                  <Image source={require('../../../assets/images/icons/plus.png')}/>
                }
              />
            </View>
          </View>
            <View style={{flex:1, paddingLeft:10}}>
                <Button title="Add 133" md  primary
                onPress={() => {
                  AssetsDrawer.current?.close();
                }}
                />
            </View>
        </View>

        </MainContainer>
          
      </RBSheet>
    
    <View style={styles.header}>
      <MainContainer>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <IconButton
                primary noBorder mdR
                onPress={() => navigation.goBack()}
                icon={
                    <Image 
                    style={{width:16, height:16, tintColor:colors.white}}
                    source={require('../../../assets/images/icons/back.png')}
                    />
                }
              />
          </View>
          <View style={{flex:1, marginLeft:10}}>
            <Text color={colors.white}>Deliver to :</Text>
            <Text bold color={colors.white}>11th Ave, Gaur City 2, Ghaziabad</Text>
          </View>

          <Ripple style={{padding:10}}
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={{position: 'absolute', zIndex:1, right:2, top:2,
              backgroundColor: colors.secondary, 
              borderRadius: 20, width:20, height:20, 
              lineHeight:20, fontSize:10}} hCenter>02</Text>
            <Image style={{}}
              source={require('../../../assets/images/icons/cart.png')}
            />
          </Ripple>
          

        </View>


        <View style={{marginVertical: 10}}>
          <Paper>
            <SearchBar
              placeholder="Search product (eg. rasgulla)"
              lightTheme
              // value={searchQuery}
              containerStyle={{
                backgroundColor: 'transparent',
                padding: 0,
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
              }}
              inputContainerStyle={{
                backgroundColor: colors.white,
                height: 38, padding:0,margin:0,
                
              }}
              inputStyle={{
                fontSize: 14,
                paddingLeft: 0,
                marginLeft: 5,
              }}
              leftIconContainerStyle={{
                paddingRight: 0,
              }}
              />
          </Paper>
        </View>

      </MainContainer>
      
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
      <Ripple style={{padding:10,}}>
        <View>
          <Text h3>Snacks</Text>
          <Text caption>13 items found</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop:5}}><Image style={{width:11, height: 6}} source={require('../../../assets/images/icons/down.png')}/></View>
        </View>
      </Ripple>
              
        <ScrollView horizontal={true} style={{borderColor:'#F3E6E6', borderLeftWidth:2,}}>

        {data.map(item => ( 

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'row',}}>
                  <Ripple>
                    <View style={{marginVertical: 7, paddingHorizontal: 10, alignItems: 'center'}}>
                      <View style={{  alignItems: 'center',}}>
                        <Image style={{width:48, height: 32}} source={item.image}/>
                      </View>
                      <Text caption hCenter style={styles.label}>{item.label}</Text>
                    </View>
                  </Ripple>
              </View>
            </View>
        ))}

        </ScrollView>
    </View>
    
    <ScrollView>
    
    <MainContainer>  
      <View style={{marginBottom:70}}>
      {item.map(item => ( 
      <View style={{marginVertical: 5}}>
        <Paper>              
          <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 78, height:78, borderRadius: 5}}
              source={require('../../../assets/images/mock_data/banner_1.png')}
            />
            <View style={{flex:1, paddingLeft: 16}}>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Image style={{width: 12, height:12,}}
                  source={require('../../../assets/images/icons/veg.png')}
                />
                <Text style={{marginLeft:6}}>Nut Butter Dream Bars</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{height:10, marginRight:4}}
                  source={require('../../../assets/images/icons/rupee.png')}
                />
                  <Text color={colors.primary}>270 Kg</Text>
                  <Text style={{marginLeft: 10, textDecorationLine: 'line-through'}}>295 Kg</Text>
                </View>
                <View style={{width:100}}>

                <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary,borderRadius: 100}}>
                  <IconButton
                    white noBorder mdR
                    onPress={() => {
                      setQty(qty <=0 ? 0: qty-1);
                    }}
                    icon={ <Image source={require('../../../assets/images/icons/minus.png')}/>}
                  />
                  
                  <Text hCenter style={{flex:1, fontSize: 14}}>{qty <= 0 ? 'Add'  : qty}</Text>
                  <IconButton
                    white noBorder mdR
                    onPress={() => {
                      setQty(qty == 0 ? 0 : qty);
                      AssetsDrawer.current?.open();
                    }}
                    icon={
                      <Image source={require('../../../assets/images/icons/plus.png')}/>
                    }
                  />
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
      <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20, }}>
        <Button 
          title="3 Items" 
          primary lg raised
          iconRight
          onPress={() => navigation.navigate('Cart')}
          icon={
            <Image
              style={{ tintColor: colors.white, marginTop:4, marginLeft: 10 }}
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
fakeBg:{
  backgroundColor: colors.primary,
  height: 150,
  width: '100%',
  padding: 20, flex: 1,
  position: 'absolute',
  top: 0
},
header:{
  backgroundColor: colors.primary
},

label:{
  marginTop: 4
},
footerMenu:{
  position: 'absolute', bottom: 0, left:0, right:0
},


})
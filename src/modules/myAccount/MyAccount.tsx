import React, { useState, useCallback, useRef } from "react";
import {View, StyleSheet,Image,Dimensions, SafeAreaView} from 'react-native';
import Ripple from 'react-native-material-ripple';

import MainContainer from '../../components/Containers/Main';
import { SearchBar, Avatar, Icon, ListItem } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';
import { colors } from '../../styles';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from "react-native-gesture-handler";
import { MenuModal } from "../modal/Menu";
import { EditAccount } from "../modal/EditAccount";


const data = [
  {id: 'a', label: 'Electric', image: require('../../../assets/images/server_icons/snack.png')},
  {id: 'b', label: 'Sweets', image: require('../../../assets/images/server_icons/sweets.png')},
  {id: 'c', label: 'Cakes', image: require('../../../assets/images/server_icons/cake.png')},
  {id: 'd', label: 'Namken', image: require('../../../assets/images/server_icons/namkeen.png')},
  {id: 'e', label: 'Biscuits', image: require('../../../assets/images/server_icons/biscuits.png')},
  {id: 'f', label: 'Others', image: require('../../../assets/images/server_icons/ice-cream.png')},
];




export default function AccountView({navigation}) {
  
  const [editAccount, setEditAccount] = useState(false);

  return (
    <>
    
    {editAccount && <EditAccount setEditAccount={setEditAccount} />}
    
    <View style={{backgroundColor:colors.bodyBase, flexGrow: 1}}>
    <View style={styles.header}>
      <View style={styles.fakeBg}>
        <View style={{position:'absolute', right: -80, top: 0}}>
        <Image 
          style={{ tintColor: colors.white}}
          source={require('../../../assets/images/pages/login.png')}
          />
          </View>
      </View>
      <MainContainer>
        <View style={{flexDirection: 'row', alignItems: 'flex-end', marginVertical:10}}>

          <View style={{flex:1}}>
            <Text h1 color={colors.white}>9876543210</Text>
            <Text color={colors.white}>Jhon Doe       </Text>
          </View>

          <View>
          <Button title="Edit" primary
            onPress={() => {
              setEditAccount(true);
            }}
          />
          </View>

        </View>


        <View style={{marginVertical: 10}}>
          <Paper style={{borderRadius:10}}>
          <View style={{marginTop:20}}>

<ListItem bottomDivider  onPress={() => navigation.navigate('Manage Address')}>
  <Avatar size={20} source={require('../../../assets/images/icons/address.png')} />
  <ListItem.Content>
    <ListItem.Title>Manage Address</ListItem.Title>
  </ListItem.Content>
  <Image style={{tintColor:'#5D6275'}} source={require('../../../assets/images/icons/right.png')} />
</ListItem>

<ListItem bottomDivider  onPress={() => navigation.navigate('Order List')}>
  <Avatar size={20} source={require('../../../assets/images/icons/orders_2.png')} />
  <ListItem.Content>
    <ListItem.Title>Orders</ListItem.Title>
  </ListItem.Content>
  <Image style={{tintColor:'#5D6275'}} source={require('../../../assets/images/icons/right.png')} />
</ListItem>

<ListItem bottomDivider>
  <Avatar size={20} source={require('../../../assets/images/icons/discount.png')} />
  <ListItem.Content>
    <ListItem.Title>Offer</ListItem.Title>
  </ListItem.Content>
  <Image style={{tintColor:'#5D6275'}} source={require('../../../assets/images/icons/right.png')} />
</ListItem>

<ListItem bottomDivider>
  <Avatar size={20} source={require('../../../assets/images/icons/heart.png')} />
  <ListItem.Content>
    <ListItem.Title>Favorites</ListItem.Title>
  </ListItem.Content>
  <Image style={{tintColor:'#5D6275'}} source={require('../../../assets/images/icons/right.png')} />
</ListItem>
    
</View>

<View style={{marginVertical:40, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
  <Button title="Logout" lg white outline onPress={() => navigation.navigate('Login')}/>
</View>

          </Paper>
        </View>

        <Text caption hCenter style={{marginTop:10}}>Ver. 0.2.2.10</Text>

      </MainContainer>
      
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
  // backgroundColor: colors.primary
},

flexContainer:{
  flexWrap: 'wrap',
  alignItems: 'center',
  flexDirection: 'row',
  marginVertical: 10, marginHorizontal: -10
},
flexList:{
  flexBasis: '33.3%' ,
  padding: 10,
  alignItems: 'center',
},
label:{
  marginTop: 4
},
footerMenu:{
  flexWrap: 'wrap',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor: colors.white
},
menuList:{
flexBasis: '20%' ,
}


})
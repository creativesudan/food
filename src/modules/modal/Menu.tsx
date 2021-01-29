import React , {useState} from 'react';
import Ripple from 'react-native-material-ripple';
import { StyleSheet, View, Modal,Image } from 'react-native';
import { Avatar, Divider, SearchBar, Icon,ListItem  } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';

import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../styles';
import MainContainer from '../../components/Containers/Main';
import { Text } from '../../components/StyledText';



export const MenuModal = ({
  setMenuModalVisible, 
}: {
  setMenuModalVisible: (state: boolean) => void;
}) => (
  // const [modalVisible, setModalVisible] = useState(false);
  <View>
    
    <Modal animationType="slide" transparent visible>

         
      <View style={{ backgroundColor: colors.white, flexGrow: 1 }}>
        <MainContainer>
          
       

          {/* search bar end */}
          <View style={{ flexGrow: 1 }}>
              <View style={{flexDirection: 'row-reverse', marginTop: 10}}>
              <IconButton
                white noBorder lgR
                // onPress={() => navigation.navigate('Delivery Location')}
                onPress={() => {
                  setMenuModalVisible(false);
                }}
                icon={
                    <Image 
                    style={{width:16}}
                    source={require('../../../assets/images/icons/close.png')}
                    />
                }
              />
              </View>

            <ScrollView>

              <View>

                <ListItem bottomDivider >
                  <Avatar size={20} source={require('../../../assets/images/icons/user.png')} />
                  <ListItem.Content>
                    <ListItem.Title>My Account</ListItem.Title>
                  </ListItem.Content>
                  <Image style={{tintColor:'#5D6275'}} source={require('../../../assets/images/icons/right.png')} />
                  {/* <ListItem.Chevron /> */}
                </ListItem>

                <ListItem bottomDivider>
                  <Avatar size={20} source={require('../../../assets/images/icons/address.png')} />
                  <ListItem.Content>
                    <ListItem.Title>Manage Address</ListItem.Title>
                  </ListItem.Content>
                  <Image style={{tintColor:'#5D6275'}} source={require('../../../assets/images/icons/right.png')} />
                </ListItem>

                <ListItem bottomDivider>
                  <Avatar size={20} source={require('../../../assets/images/icons/orders_2.png')} />
                  <ListItem.Content>
                    <ListItem.Title>Orders</ListItem.Title>
                  </ListItem.Content>
                  <Image style={{tintColor:'#5D6275'}} source={require('../../../assets/images/icons/right.png')} />
                </ListItem>

                <ListItem bottomDivider>
                  <Avatar size={20} source={require('../../../assets/images/icons/star.png')} />
                  <ListItem.Content>
                    <ListItem.Title>Rate US</ListItem.Title>
                  </ListItem.Content>
                  <Image style={{tintColor:'#5D6275'}} source={require('../../../assets/images/icons/right.png')} />
                </ListItem>

                <ListItem bottomDivider>
                  <Avatar size={20} source={require('../../../assets/images/icons/paper.png')} />
                  <ListItem.Content>
                    <ListItem.Title>Term and Condition</ListItem.Title>
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

                <ListItem>
                  <Avatar size={20} source={require('../../../assets/images/icons/call.png')} avatarStyle={{tintColor: '#5D6275'}}/>
                  <ListItem.Content>
                    <ListItem.Title>Call Us</ListItem.Title>
                  </ListItem.Content>
                  <Image style={{tintColor:'#5D6275'}} source={require('../../../assets/images/icons/right.png')} />
                </ListItem>
                    
              </View>

            </ScrollView>
          </View>
        </MainContainer>
      </View>
      <View style={{position: 'absolute', bottom:30, left:0, right:0}}><Text caption hCenter style={{marginTop:10}}>Ver. 0.2.2.10</Text></View>

    </Modal>
  </View>
);

const styles = StyleSheet.create({
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
});


export default MenuModal;
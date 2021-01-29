import React , {useState} from 'react';
import Ripple from 'react-native-material-ripple';
import { StyleSheet, View, Modal,Image,TextInput } from 'react-native';
import { Avatar, Divider, SearchBar, Icon,ListItem  } from 'react-native-elements';
import { Button, IconButton } from '../../components/StyledButton';

import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../styles';
import MainContainer from '../../components/Containers/Main';
import { Text } from '../../components/StyledText';
import Paper from '../../components/Paper';



export const SearchView = ({
  setSearchModalVisible,
}: {
  setSearchModalVisible: (state: boolean) => void;
  
}) =>  {
  const [searchVal, setSearch] = useState(false); 
  return (
  
  <View>
    
    <Modal animationType="slide" transparent visible>

         
      <View style={{ backgroundColor: '#FFFCFC', flexGrow: 1 }}>
            <ScrollView>
          
       

          {/* search bar end */}
          <View style={{ flexGrow: 1, }}>
              <View style={{flexDirection: 'row', backgroundColor: '#fff',
                            shadowColor: '#000',
                            shadowOffset: { width: 4, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 1.41,
                            elevation: 2,

            }}>
              
              <IconButton
                white noBorder lgR
                onPress={() => {setSearchModalVisible(false);}}
                icon={
                    <Image 
                    style={{width:16, height:16, tintColor:colors.primary}}
                    source={require('../../../assets/images/icons/back.png')}
                    />
                }
              />

                <View style={{flex:1}}>
                  <TextInput
                    autoFocus={true}
                    style={styles.input}
                    onChangeText={setSearch}
                    value={searchVal}
                    placeholder="Search here..."
                    keyboardType="default"
                  />
                </View>
              <IconButton
                white lgR noBorder
                onPress={() => {
                  setSearchModalVisible(false);
                }}
                icon={
                    <Image 
                    style={{width:16, height:16}}
                    source={require('../../../assets/images/icons/close.png')}
                    />
                }
              />
              </View>
            
        <MainContainer>
            {searchVal.length > 0 ? 
            (
              <View style={{marginTop:20}}>
              <View>
                <Text label style={{marginBottom:10}}>Past Searches</Text>
                <ListItem bottomDivider containerStyle={{backgroundColor: 'transparent', paddingVertical:10, paddingHorizontal:0}}>
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text p>Nut Butter Dream Bars</Text>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>

                <ListItem containerStyle={{backgroundColor: 'transparent', paddingVertical:10, paddingHorizontal:0}}>
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text p>Low-Sugar Snacks</Text>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </View>
              
              <View style={{marginTop:20}}>
                <Text label>Popular Categories</Text>
                <Paper style={{marginVertical:10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Ripple style={styles.item}>
                        <Image 
                          // style={{width:16}}
                          source={require('../../../assets/images/server_icons/snack.png')}
                        />
                        <Text p>Snacks</Text>
                    </Ripple>
                    <Ripple style={styles.item}>
                        <Image 
                          // style={{width:16}}
                          source={require('../../../assets/images/server_icons/sweets.png')}
                        />
                        <Text p>Sweets</Text>
                    </Ripple>
                    <Ripple style={styles.item}>
                        <Image 
                          // style={{width:16}}
                          source={require('../../../assets/images/server_icons/cake.png')}
                        />
                        <Text p>Cakes</Text>
                    </Ripple>
                    <Ripple style={styles.item}>
                        <Image 
                          // style={{width:16}}
                          source={require('../../../assets/images/server_icons/namkeen.png')}
                        />
                        <Text p>Namkeen</Text>
                    </Ripple>
                    <Ripple style={styles.item}>
                        <Image 
                          // style={{width:16}}
                          source={require('../../../assets/images/server_icons/biscuits.png')}
                        />
                        <Text p>Biscuits</Text>
                    </Ripple>
                  </View>
                </Paper>
              </View>

              </View>
            )
            : 
            (
            <View style={{flexDirection: 'column', alignItems: 'center', alignSelf: 'center', marginTop:100}}>
              <Image source={require('../../../assets/images/pages/no_search.png')} />
              <Text h3 style={{marginBottom:4}}>Don't have any items</Text>
              <Text style={{fontSize:12, color: '#9196A9'}}>Unable to find any products </Text>
            </View>)
            }
         
            
        </MainContainer>

            


          </View>
            </ScrollView>
      </View>
    </Modal>
  </View>
  )}

const styles = StyleSheet.create({
  item:{
    flexDirection: 'column', flex:1, alignItems: 'center',
    paddingVertical:10
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
  input:{
    height:54
  },
});


export default SearchView;
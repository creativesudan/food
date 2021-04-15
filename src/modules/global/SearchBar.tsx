import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Icon } from 'react-native-elements';
import { Text } from '../../components/StyledText';
import { colors } from '../../styles';
import SearchView from "../modal/SearchView";




export default function SearchBar(navigation) {

  const [searchModalVisible, setSearchModalVisible] = useState(false);

  return (
    <>

      {searchModalVisible && <SearchView setSearchModalVisible={setSearchModalVisible} navigation={navigation} />}
      <View style={{ marginBottom: 10, marginTop: 5 }}>
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



    </>
  )
}


const styles = StyleSheet.create({



})
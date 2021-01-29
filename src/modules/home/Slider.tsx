import * as React from 'react';
import {Text, Image,View,SafeAreaView,Dimensions  } from 'react-native';

import Carousel from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;
export default class Slider extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
          {
              title:"Item 3",
              text: "Text 3",
          },
          {
              title:"Item 4",
              text: "Text 4",
          },
          {
              title:"Item 5",
              text: "Text 5",
          },
        ]
      }
    }

    _renderItem({item,index}){
        return (
          <View style={{
              borderRadius: 11,
              overflow: 'hidden'
              // marginLeft: 25,
              // marginRight: 25,
               }}>
             <Image resizeMode={'cover'} style={{width: '100%', borderRadius: 11}} source={require('../../../assets/images/mock_data/banner_1.png')}
          />
          </View>

        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1}}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                activeSlideAlignment={'end'}
                  autoplayDelay={1000}
                  autoplayInterval={4000}
                  loop={true}
                  autoplay={true}
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={windowWidth-20}
                  itemWidth={windowWidth-20}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}


import * as React from 'react';
import { View, Text, Image } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import HomeView from '../home/Home';
import Login from '../auth/Login';
import DeliveryLocationView from '../home/DeliveryLocation';
import { colors } from '../../styles';
import { IconButton } from '../../components/StyledButton';
import { Icon } from 'react-native-elements';
import CartView from '../cart/Cart';
import CategoryView from '../category/Category';
import AccountView from '../myAccount/MyAccount';
import OrderListView from '../order/OrderList';
import OrderDetailView from '../order/OrderDetail';
import ManageAddressView from '../myAccount/ManageAddress';
import OtpView from '../auth/Otp';
import PaymentView from '../cart/Payment';
import OrderPlacedView from '../cart/OrderPlaced';

import { useSelector } from "react-redux";
import ProductListView from '../category/ProductList';


export type StackParamList = {
  Home: undefined;
  Detail: undefined;
  DefaultHeader: undefined;
  StickyHeader: undefined;
  BackgroundHeader: undefined;
  SubHeader: undefined;
  WithCustomHeader: undefined;
  CustomHeaderDetail: undefined;
};

// type ScreenProps = {
//   navigation: StackNavigationProp<StackParamList>;
// };


// const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

// const samples: { title: string; routeName: keyof StackParamList }[] = [
//   { title: 'Sample 1-1: Default Header', routeName: 'DefaultHeader' },
//   { title: 'Sample 1-2: Sticky Header', routeName: 'StickyHeader' },
//   { title: 'Sample 1-3: Background Header', routeName: 'BackgroundHeader' },
//   { title: 'Sample 2: Sub Header', routeName: 'SubHeader' },
//   { title: 'Sample 3: Custom Header', routeName: 'WithCustomHeader' },
// ];

// function HomeScreen({ navigation }: ScreenProps) {
//   return (

//     <View style={{ flex: 1, paddingTop: 50, alignItems: 'center' }}>
//       {samples.map((sample) => (
//         <Text
//           key={sample.title}
//           style={{ margin: 15 }}
//           onPress={() => {
//             navigation.navigate(sample.routeName);
//           }}>
//           {sample.title}
//         </Text>
//       ))}
//     </View>
//   );
// }

const Stack = createStackNavigator();


function Navigator() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
      {
        isAuthenticated ? (
          <Stack.Navigator initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.white,
              },
            }
            }>


            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeView}
            // options={{ title: 'react-navigation-collapsible',}}
            />

            <Stack.Screen
              name="Delivery Location"
              component={DeliveryLocationView}
              options={{
                headerStyle: {
                  backgroundColor: colors.white,
                },
                headerTintColor: '#5D6275',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 14,
                },
                title: 'Search Delivery Location',
                // headerRight: () => (
                //   <IconButton
                //     white noBorder 
                //     icon={
                //       <Image
                //         style={{ width:14, height:14 }}
                //         source={require('../../../assets/images/icons/close.png')}
                //       />
                //     }
                //   />
                // ),

              }}
            />

            <Stack.Screen
              name="Cart"
              component={CartView}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: colors.white,
                },
                headerTintColor: '#5D6275',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 14,
                },
                title: 'Cart',
              }}
            />

            <Stack.Screen
              name="Payment"
              component={PaymentView}
              options={{
                headerStyle: {
                  backgroundColor: colors.primary,
                  elevation: 0
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 14,
                },
                title: 'Payment',
              }}
            />

            <Stack.Screen
              name="Order Summary"
              component={OrderPlacedView}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Category"
              component={CategoryView}
              options={{

                headerShown: false,
                headerStyle: {
                  backgroundColor: colors.white,
                },
                headerTintColor: '#5D6275',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 14,
                },
                title: 'Category',
              }}
            />

            <Stack.Screen
              name="ProductList"
              component={ProductListView}
              options={{

                headerShown: false,
                headerStyle: {
                  backgroundColor: colors.white,
                },
                headerTintColor: '#5D6275',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 14,
                },
                title: 'Category',
              }}
            />

            <Stack.Screen
              name="My Account"
              component={AccountView}
              options={{
                headerStyle: {
                  backgroundColor: colors.primary,
                  elevation: 0
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 14,
                },
                title: '',
              }}
            />

            <Stack.Screen
              name="Order List"
              component={OrderListView}
              options={{
                headerStyle: {
                  backgroundColor: colors.primary,
                  elevation: 0
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 14,
                },
                title: 'Orders',
              }}
            />

            <Stack.Screen
              name="Order Detail"
              component={OrderDetailView}
              options={{
                headerStyle: {
                  backgroundColor: colors.primary,
                  elevation: 0
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 14,
                },
                title: 'Summary',
              }}
            />

            <Stack.Screen
              name="Manage Address"
              component={ManageAddressView}
              options={{
                headerStyle: {
                  backgroundColor: colors.primary,
                  elevation: 0
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 14,
                },
                title: 'Manage Address',
              }}
            />
          </Stack.Navigator >
        ) : (
          <Stack.Navigator initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.white,
              },
            }}>

            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false
              }}
            />

            <Stack.Screen
              name="Otp"
              component={OtpView}
              options={{
                headerShown: false,
                title: 'Manage Address',
              }}
            />



          </Stack.Navigator>
        )}
    </>
  );
}

export default Navigator;

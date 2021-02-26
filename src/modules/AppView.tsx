import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import Login from './auth/Login';
import OtpView from './auth/Otp';
import CartView from './cart/Cart';
import OrderPlacedView from './cart/OrderPlaced';
import PaymentView from './cart/Payment';
import CategoryView from './category/Category';
import DeliveryLocationView from './home/DeliveryLocation';
import HomeView from './home/Home';
import ManageAddressView from './myAccount/ManageAddress';
import AccountView from './myAccount/MyAccount';
import Navigator from './navigation/Navigator';
import OrderDetailView from './order/OrderDetail';
import OrderListView from './order/OrderList';

import { useDispatch, useSelector } from "react-redux";
import { fetchUser, initAuth } from "../redux/actions/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppView() {
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.auth.isAuthenticated || false);
  const userId = useSelector(state => state.auth.userId || null);
  const user = useSelector(state => state.auth.user)
  const showInitScreen = useSelector(state => state.app.showInitScreen || false);
  const inProgress = useSelector(state => state.app.inProgress || 0);

  // useEffect(() => {
  //   AsyncStorage.getItem('user_id')
  //     .then((result) => {
  //       console.log(result);
  //       if (result !== null) dispatch(initAuth(result))
  //     });
  // });

  useEffect(() => {
    dispatch({ type: "APP_LOADING" })
  }, []);


  return (
    <>
      {/* <Login/> */}
      {/* <OtpView/> */}
      {/* <HomeView/> */}
      {/* <AccountView/> */}
      {/* <CategoryView/> */}
      {/* <CartView/> */}
      {/* <PaymentView/> */}
      {/* <DeliveryLocationView/> */}
      {/* <OrderPlacedView/> */}
      {/* <Navigator/> */}
      {/* <ManageAddressView/> */}
      {/* <OrderDetailView/> */}
      {/* <OrderListView/> */}
      {inProgress > 0 && !showInitScreen && <Text style={{ fontSize: 20 }}>Loading...</Text>}
      {showInitScreen ? <Text style={{ fontSize: 40 }}>Bobby Sweets</Text> : <Navigator />}


    </>
  )
}
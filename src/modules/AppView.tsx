import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
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
import { fetchAddressList, deleteAddress } from "../redux/actions/address";

export default function AppView() {
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.auth.isAuthenticated || false);
  const userId = useSelector(state => state.auth.userId || null);
  const user = useSelector(state => state.auth.user)
  const showInitScreen = useSelector(state => state.app.showInitScreen || false);
  const inProgress = useSelector(state => state.app.inProgress || 0);
  const addressesSynced = useSelector(state => state.address.addressesSynced || false);

  useEffect(() => {
    dispatch({ type: "APP_LOADING" })
  }, []);

  useEffect(() => {
    if (!addressesSynced) dispatch(fetchAddressList())
  }, [addressesSynced]);


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
      {inProgress > 0 && !showInitScreen &&
        <Image
          style={{ height: '100%' }}
          source={require('../../assets/images/mock_data/flash-screen.png')}
        />
      }
      {showInitScreen ?

        <Image
          style={{ height: '100%' }}
          source={require('../../assets/images/mock_data/flash-screen.png')}
        />
        : <Navigator />}


    </>
  )
}
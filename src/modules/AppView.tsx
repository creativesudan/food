import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {View, Text} from 'react-native';
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

export default function AppView() {
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

      <Navigator/>

    </>
  )
}
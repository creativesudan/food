import { StackNavigationProp } from '@react-navigation/stack';

export const HOME = 'Wallet';
export const CONTACTS = 'Contacts';
export const SEND_FUNDS = 'Send Funds';
export const PAY_BILLS = 'Pay Bills';
export const TRANSACTION_SUMMARY = 'Transaction Summary';
export const REQUEST_FUNDS = 'Request Funds';
export const QR_DETAILS = 'Qr Details';
export const INTRO_SLIDER = 'Intro Slider';
export const ADD_FUNDS = 'Add Funds';
export const ADD_FUEL = 'Add Fuel';
export const SETTINGS = 'Settings';
export const MY_PROFILE = 'My Profile';
export type MyProfileNavigationProp = StackNavigationProp<any, 'My Profile'>;
export const PROFILE_SETUP = 'Profile Setup';
export type ProfileSetupNavigationProp = StackNavigationProp<
  any,
  'Profile Setup'
>;

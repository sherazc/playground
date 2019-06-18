import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, View } from 'native-base';
import Dashboard from './src/screens/Dashboard';
import TrashPickup from './src/screens/Dashboard/TrashPickup';
import Booking from './src/screens/Dashboard/Booking';
import DashboardNavigator from './DashboardNavigator';

export default createAppContainer(DashboardNavigator);
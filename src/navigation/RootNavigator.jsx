import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

// Temporarily hardcoded to test navigation.
// Will be replaced with AuthContext.isLoggedIn in the Auth step.
const isLoggedIn = false;

const RootNavigator = () => {
    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default RootNavigator;

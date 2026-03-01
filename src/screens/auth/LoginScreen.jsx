import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
    text: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
});

export default LoginScreen;

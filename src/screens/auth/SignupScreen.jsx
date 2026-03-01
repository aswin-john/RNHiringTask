import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SignupScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Signup Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
    text: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
});

export default SignupScreen;

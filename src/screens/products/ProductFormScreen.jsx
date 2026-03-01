import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductFormScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Product Form Screen (Add / Edit)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F4F6' },
    text: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
});

export default ProductFormScreen;

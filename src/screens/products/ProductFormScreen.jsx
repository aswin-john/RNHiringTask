import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import useProductForm from './useProductForm';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

const ProductFormScreen = ({ route, navigation }) => {
    const existingProduct = route.params?.product || null;
    const {
        name, setName,
        price, setPrice,
        quantity, setQuantity,
        category, setCategory,
        image,
        pickImage,
        loading,
        isEditing,
        handleSubmit,
    } = useProductForm(existingProduct, navigation);

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>‹</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{isEditing ? 'Edit Product' : 'Add Product'}</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Image Picker */}
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage} activeOpacity={0.8}>
                    {image ? (
                        <Image source={{ uri: image.uri }} style={styles.pickedImage} />
                    ) : existingProduct?.imageId ? (
                        <View style={styles.imageHint}>
                            <Text style={styles.imageHintIcon}>🖼️</Text>
                            <Text style={styles.imageHintText}>Tap to change image</Text>
                        </View>
                    ) : (
                        <View style={styles.imageHint}>
                            <Text style={styles.imageHintIcon}>📷</Text>
                            <Text style={styles.imageHintText}>Tap to add product image</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Form Fields */}
                <View style={styles.form}>
                    <AppInput
                        label="Product Name"
                        value={name}
                        onChangeText={setName}
                        placeholder="e.g. Running Shoes"
                    />
                    <AppInput
                        label="Price (₹)"
                        value={price}
                        onChangeText={setPrice}
                        placeholder="e.g. 499.99"
                        keyboardType="decimal-pad"
                    />
                    <AppInput
                        label="Quantity"
                        value={quantity}
                        onChangeText={setQuantity}
                        placeholder="e.g. 50"
                        keyboardType="number-pad"
                    />
                    <AppInput
                        label="Category"
                        value={category}
                        onChangeText={setCategory}
                        placeholder="e.g. Footwear"
                    />

                    <AppButton
                        title={isEditing ? 'SAVE CHANGES' : 'ADD PRODUCT'}
                        variant="primary"
                        loading={loading}
                        onPress={handleSubmit}
                        style={styles.submitBtn}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.surface },
    container: { flexGrow: 1, paddingBottom: 40 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: colors.surface,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    backBtnText: { fontSize: 28, color: colors.textPrimary, lineHeight: 34 },
    headerTitle: { ...typography.h2, color: colors.textPrimary },
    imagePicker: {
        height: 180,
        margin: 16,
        borderRadius: 16,
        backgroundColor: colors.background,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: colors.border,
        borderStyle: 'dashed',
    },
    pickedImage: { width: '100%', height: '100%' },
    imageHint: { alignItems: 'center' },
    imageHintIcon: { fontSize: 40, marginBottom: 8 },
    imageHintText: { ...typography.bodySmall, color: colors.textSecondary },
    form: { paddingHorizontal: 20, paddingTop: 8 },
    submitBtn: { marginTop: 12 },
});

export default ProductFormScreen;

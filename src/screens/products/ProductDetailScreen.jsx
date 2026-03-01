import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import useProductDetail from './useProductDetail';
import { getImageUrl } from '../../services/storageService';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const ProductDetailScreen = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const { product: initialProduct } = route.params;
    const { product, loading, fetchProduct, handleDelete } = useProductDetail(initialProduct.$id, navigation);

    // Re-fetch fresh data every time this screen comes into focus (e.g. after editing)
    useFocusEffect(
        useCallback(() => {
            fetchProduct();
        }, [fetchProduct]),
    );

    const data = product || initialProduct;
    const imageUrl = data.imageId ? getImageUrl(data.imageId) : null;
    const isLowStock = data.quantity <= 5;

    if (loading && !product) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image Header */}
                <View style={styles.imageHeader}>
                    {imageUrl ? (
                        <Image source={{ uri: imageUrl }} style={styles.heroImage} />
                    ) : (
                        <View style={styles.imageFallback}>
                            <Icon name="cube-outline" size={80} color={colors.primary} />
                        </View>
                    )}
                    {/* Back Button */}
                    <TouchableOpacity
                        style={[styles.backBtn, { top: 16 + insets.top }]}
                        onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Detail Card */}
                <View style={styles.card}>
                    <View style={styles.titleRow}>
                        <Text style={styles.productName}>{data.name}</Text>
                        <View style={[styles.badge, isLowStock ? styles.badgeLow : styles.badgeActive]}>
                            <Text style={styles.badgeText}>{isLowStock ? '⚠ Low Stock' : '✓ Active'}</Text>
                        </View>
                    </View>

                    <Text style={styles.category}>{data.category}</Text>
                    <View style={styles.divider} />

                    <InfoRow label="Price" value={`₹${data.price}`} />
                    <InfoRow label="Quantity in Stock" value={String(data.quantity)} />
                    <InfoRow label="Category" value={data.category} />

                    {/* Action Buttons */}
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.actionBtn, styles.editBtn]}
                            onPress={() => navigation.navigate('ProductForm', { product: data })}>
                            <Icon name="pencil-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                            <Text style={styles.editBtnText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionBtn, styles.deleteBtn]}
                            onPress={handleDelete}>
                            <Icon name="trash-outline" size={18} color={colors.error} style={{ marginRight: 6 }} />
                            <Text style={styles.deleteBtnText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
    imageHeader: {
        height: 260,
        backgroundColor: colors.accent,
    },
    heroImage: { width: '100%', height: '100%' },
    imageFallback: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    backBtn: {
        position: 'absolute',
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    card: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
        padding: 24,
        paddingBottom: 40,
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    productName: { ...typography.h1, color: colors.textPrimary, flex: 1, marginRight: 12 },
    category: { ...typography.body, color: colors.textSecondary, marginBottom: 20 },
    badge: { borderRadius: 100, paddingHorizontal: 10, paddingVertical: 5 },
    badgeActive: { backgroundColor: '#ECFDF5' },
    badgeLow: { backgroundColor: '#FFF7ED' },
    badgeText: { fontSize: 12, fontWeight: '600', color: colors.textPrimary },
    divider: { height: 1, backgroundColor: colors.border, marginBottom: 20 },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    infoLabel: { ...typography.label, color: colors.textSecondary },
    infoValue: { ...typography.body, color: colors.textPrimary, fontWeight: '600' },
    actions: { flexDirection: 'row', gap: 12, marginTop: 28 },
    actionBtn: { flex: 1, borderRadius: 100, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    editBtn: { backgroundColor: colors.primary },
    editBtnText: { ...typography.button, color: '#FFFFFF' },
    deleteBtn: { backgroundColor: '#FEE2E2' },
    deleteBtnText: { ...typography.button, color: colors.error },
});

export default ProductDetailScreen;

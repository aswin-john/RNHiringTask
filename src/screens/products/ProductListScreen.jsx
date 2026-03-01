import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import useProductList from './useProductList';
import { getImageUrl } from '../../services/storageService';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

const LOW_STOCK_THRESHOLD = 5;

const ProductCard = ({ product, onPress, onDelete }) => {
    const isLow = product.quantity <= LOW_STOCK_THRESHOLD;
    const imageUrl = product.imageId ? getImageUrl(product.imageId) : null;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
            {/* Product Image */}
            <View style={styles.imageBox}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : (
                    <Text style={styles.imagePlaceholder}>📦</Text>
                )}
            </View>

            {/* Product Info */}
            <View style={styles.cardInfo}>
                <Text style={styles.cardName} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.cardCategory}>{product.category}</Text>
                <Text style={styles.cardStock}>
                    Stock: <Text style={{ color: isLow ? colors.warning : colors.textPrimary }}>{product.quantity}</Text>
                </Text>
                <Text style={styles.cardPrice}>₹{product.price}</Text>
            </View>

            {/* Badge + Chevron */}
            <View style={styles.cardRight}>
                <View style={[styles.badge, isLow ? styles.badgeLow : styles.badgeActive]}>
                    <Text style={styles.badgeText}>{isLow ? 'Low' : 'Active'}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
            </View>
        </TouchableOpacity>
    );
};

const ProductListScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { logout } = useAuth();
    const {
        products, search, setSearch,
        loading, searching, refreshing, refresh, handleDelete,
    } = useProductList();

    // Re-fetch whenever this screen comes back into focus (e.g. after adding a product)
    useFocusEffect(
        useCallback(() => {
            refresh();
        }, []),
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: 20 + insets.top }]}>
                <View>
                    <Text style={styles.greeting}>Hello 👋</Text>
                    <Text style={styles.headerTitle}>My Inventory</Text>
                </View>
                <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search products..."
                    placeholderTextColor={colors.textMuted}
                    value={search}
                    onChangeText={setSearch}
                />
                {searching && (
                    <ActivityIndicator size="small" color={colors.primary} style={{ marginRight: 8 }} />
                )}
            </View>

            {/* Product Count */}
            <Text style={styles.countText}>{products.length} product{products.length !== 1 ? 's' : ''}</Text>

            {/* Product List */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.$id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} colors={[colors.primary]} />}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📭</Text>
                        <Text style={styles.emptyText}>No products yet.</Text>
                        <Text style={styles.emptySubtext}>Tap + to add your first product.</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                        onDelete={() => handleDelete(item)}
                    />
                )}
            />

            {/* FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('ProductForm', { product: null })}
                activeOpacity={0.85}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        ...typography.bodySmall,
        color: 'rgba(255,255,255,0.7)',
    },
    headerTitle: {
        ...typography.h2,
        color: '#FFFFFF',
    },
    logoutBtn: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    logoutText: {
        ...typography.bodySmall,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        marginHorizontal: 16,
        marginTop: -14,
        borderRadius: 100,
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    searchIcon: { fontSize: 16, marginRight: 8 },
    searchInput: {
        flex: 1,
        ...typography.body,
        color: colors.textPrimary,
        paddingVertical: 12,
    },
    countText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        marginTop: 16,
        marginHorizontal: 20,
        marginBottom: 8,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
    imageBox: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: colors.accent,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        overflow: 'hidden',
    },
    image: { width: 64, height: 64 },
    imagePlaceholder: { fontSize: 28 },
    cardInfo: { flex: 1 },
    cardName: {
        ...typography.h3,
        color: colors.textPrimary,
        marginBottom: 2,
    },
    cardCategory: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    cardStock: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    cardPrice: {
        ...typography.body,
        fontWeight: '600',
        color: colors.primary,
        marginTop: 2,
    },
    cardRight: {
        alignItems: 'center',
    },
    badge: {
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 8,
    },
    badgeActive: { backgroundColor: '#ECFDF5' },
    badgeLow: { backgroundColor: '#F5F3FF' },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    chevron: { fontSize: 22, color: colors.textMuted },
    emptyState: {
        alignItems: 'center',
        paddingTop: 80,
    },
    emptyIcon: { fontSize: 48, marginBottom: 12 },
    emptyText: {
        ...typography.h3,
        color: colors.textSecondary,
        marginBottom: 6,
    },
    emptySubtext: {
        ...typography.bodySmall,
        color: colors.textMuted,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
    },
    fabText: { color: '#FFFFFF', fontSize: 30, lineHeight: 34 },
});

export default ProductListScreen;

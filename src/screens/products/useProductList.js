
import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { listProducts, deleteProduct } from '../../services/productService';
import { deleteImage } from '../../services/storageService';
import useDebounce from '../../hooks/useDebounce';

const useProductList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);     // initial full-screen load only
    const [searching, setSearching] = useState(false); // silent search indicator
    const [refreshing, setRefreshing] = useState(false);
    const isFirstLoad = useRef(true);
    const debouncedSearch = useDebounce(search, 400);

    const fetch = useCallback(async (showRefresh = false) => {
        if (showRefresh) {
            setRefreshing(true);
        } else if (isFirstLoad.current) {
            setLoading(true);
        } else {
            setSearching(true); // silent — list stays visible while fetching
        }

        try {
            const docs = await listProducts(debouncedSearch);
            setProducts(docs);
        } catch (e) {
            Alert.alert('Error', e.message || 'Failed to load products.');
        } finally {
            setLoading(false);
            setRefreshing(false);
            setSearching(false);
            isFirstLoad.current = false;
        }
    }, [debouncedSearch]);

    useEffect(() => { fetch(); }, [fetch]);

    const handleDelete = (product) => {
        Alert.alert(
            'Delete Product',
            `Remove "${product.name}" ? `,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteProduct(product.$id);
                            if (product.imageId) await deleteImage(product.imageId);
                            setProducts(prev => prev.filter(p => p.$id !== product.$id));
                        } catch (e) {
                            Alert.alert('Error', e.message || 'Could not delete product.');
                        }
                    },
                },
            ],
        );
    };

    return {
        products,
        search, setSearch,
        loading,
        searching,
        refreshing,
        refresh: () => fetch(true),
        handleDelete,
    };
};

export default useProductList;

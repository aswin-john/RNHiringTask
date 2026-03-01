import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getProduct, deleteProduct } from '../../services/productService';
import { deleteImage } from '../../services/storageService';

const useProductDetail = (productId, navigation) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const doc = await getProduct(productId);
                setProduct(doc);
            } catch (e) {
                Alert.alert('Error', e.message || 'Failed to load product.');
            } finally {
                setLoading(false);
            }
        })();
    }, [productId]);

    const handleDelete = () => {
        Alert.alert(
            'Delete Product',
            `Remove "${product?.name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteProduct(product.$id);
                            if (product.imageId) await deleteImage(product.imageId);
                            navigation.goBack();
                        } catch (e) {
                            Alert.alert('Error', e.message || 'Could not delete product.');
                        }
                    },
                },
            ],
        );
    };

    return { product, loading, handleDelete };
};

export default useProductDetail;

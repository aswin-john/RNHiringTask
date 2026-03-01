import { useState, useCallback } from 'react';
import { getProduct, deleteProduct } from '../../services/productService';
import { deleteImage } from '../../services/storageService';
import { useAlert } from '../../context/AlertContext';

const useProductDetail = (productId, navigation) => {
    const { showAlert } = useAlert();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProduct = useCallback(async () => {
        setLoading(true);
        try {
            const doc = await getProduct(productId);
            setProduct(doc);
        } catch (e) {
            showAlert('Error', e.message || 'Failed to load product.');
        } finally {
            setLoading(false);
        }
    }, [productId]);

    const handleDelete = () => {
        showAlert(
            'Delete Product',
            `Remove "${product?.name}"? This action cannot be undone.`,
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
                            showAlert('Error', e.message || 'Could not delete product.');
                        }
                    },
                },
            ],
        );
    };

    return { product, loading, fetchProduct, handleDelete };
};

export default useProductDetail;

import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { createProduct, updateProduct } from '../../services/productService';
import { uploadImage, deleteImage } from '../../services/storageService';
import useImagePicker from '../../hooks/useImagePicker';
import { useAuth } from '../../context/AuthContext';

const useProductForm = (existingProduct, navigation) => {
    const { user } = useAuth();
    const isEditing = !!existingProduct;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const { image, pickImage, setImage } = useImagePicker();

    // Pre-fill if editing
    useEffect(() => {
        if (existingProduct) {
            setName(existingProduct.name || '');
            setPrice(String(existingProduct.price || ''));
            setQuantity(String(existingProduct.quantity || ''));
            setCategory(existingProduct.category || '');
        }
    }, [existingProduct]);

    const validate = () => {
        if (!name.trim()) { Alert.alert('Validation', 'Product name is required.'); return false; }
        if (!price || isNaN(Number(price))) { Alert.alert('Validation', 'Enter a valid price.'); return false; }
        if (!quantity || isNaN(Number(quantity))) { Alert.alert('Validation', 'Enter a valid quantity.'); return false; }
        if (!category.trim()) { Alert.alert('Validation', 'Category is required.'); return false; }
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            let imageId = existingProduct?.imageId || '';

            if (image) {
                // Upload new image
                const newId = await uploadImage(image);
                // If editing and had an old image, delete it
                if (isEditing && existingProduct.imageId) {
                    await deleteImage(existingProduct.imageId).catch(() => { });
                }
                imageId = newId;
            }

            const data = {
                name: name.trim(),
                price: parseFloat(price),
                quantity: parseInt(quantity, 10),
                category: category.trim(),
                imageId,
                // Only set userId on create; never overwrite on edit
                ...(!isEditing && { userId: user.$id }),
            };

            if (isEditing) {
                await updateProduct(existingProduct.$id, data);
            } else {
                await createProduct(data);
            }
            navigation.goBack();
        } catch (e) {
            Alert.alert('Error', e.message || 'Failed to save product.');
        } finally {
            setLoading(false);
        }
    };

    return {
        name, setName,
        price, setPrice,
        quantity, setQuantity,
        category, setCategory,
        image,
        pickImage,
        loading,
        isEditing,
        handleSubmit,
    };
};

export default useProductForm;

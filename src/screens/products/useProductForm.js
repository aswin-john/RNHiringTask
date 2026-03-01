import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../../services/productService';
import { uploadImage, deleteImage } from '../../services/storageService';
import useImagePicker from '../../hooks/useImagePicker';
import { useAuth } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';

const useProductForm = (existingProduct, navigation) => {
    const { user } = useAuth();
    const { showAlert } = useAlert();
    const isEditing = !!existingProduct;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const { image, pickImage } = useImagePicker();

    useEffect(() => {
        if (existingProduct) {
            setName(existingProduct.name || '');
            setPrice(String(existingProduct.price || ''));
            setQuantity(String(existingProduct.quantity || ''));
            setCategory(existingProduct.category || '');
        }
    }, [existingProduct]);

    const validate = () => {
        if (!name.trim()) { showAlert('Validation', 'Product name is required.'); return false; }
        if (!price || isNaN(Number(price))) { showAlert('Validation', 'Enter a valid price.'); return false; }
        if (!quantity || isNaN(Number(quantity))) { showAlert('Validation', 'Enter a valid quantity.'); return false; }
        if (!category.trim()) { showAlert('Validation', 'Category is required.'); return false; }
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            let imageId = existingProduct?.imageId || '';

            if (image) {
                const newId = await uploadImage(image);
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
                ...(!isEditing && { userId: user.$id }),
            };

            if (isEditing) {
                await updateProduct(existingProduct.$id, data);
            } else {
                await createProduct(data);
            }
            navigation.goBack();
        } catch (e) {
            showAlert('Error', e.message || 'Failed to save product.');
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

import { useState, useCallback } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

/**
 * Hook to pick an image from the device gallery.
 * Returns the picked image asset and a trigger function.
 */
const useImagePicker = () => {
    const [image, setImage] = useState(null); // { uri, name, type, fileSize }

    const pickImage = useCallback(() => {
        return new Promise((resolve) => {
            launchImageLibrary(
                {
                    mediaType: 'photo',
                    quality: 0.8,
                    includeBase64: false,
                },
                (response) => {
                    if (response.didCancel || response.errorCode) {
                        resolve(null);
                        return;
                    }
                    const asset = response.assets?.[0];
                    if (asset) {
                        const picked = {
                            uri: asset.uri,
                            name: asset.fileName || `image_${Date.now()}.jpg`,
                            type: asset.type || 'image/jpeg',
                            fileSize: asset.fileSize || 0,
                        };
                        setImage(picked);
                        resolve(picked);
                    } else {
                        resolve(null);
                    }
                },
            );
        });
    }, []);

    const clearImage = useCallback(() => setImage(null), []);

    return { image, pickImage, clearImage, setImage };
};

export default useImagePicker;

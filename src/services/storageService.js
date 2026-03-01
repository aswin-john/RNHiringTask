import { storage } from '../config/appwrite';
import { APPWRITE } from '../config/appwrite';
import { ID } from 'appwrite';
import Config from 'react-native-config';

const { BUCKET_ID } = APPWRITE;

/**
 * Upload an image file to Appwrite Storage using the REST API directly.
 * The web SDK cannot accept React Native's { uri, name, type } file format,
 * so we build a multipart FormData request manually using fetch.
 *
 * @param {{ uri: string, name: string, type: string }} file
 * @returns {Promise<string>} The new file's $id
 */
export const uploadImage = async (file) => {
    const fileId = ID.unique();

    const formData = new FormData();
    formData.append('fileId', fileId);
    formData.append('file', {
        uri: file.uri,
        name: file.name || 'upload.jpg',
        type: file.type || 'image/jpeg',
    });

    const endpoint = Config.APPWRITE_ENDPOINT;
    const projectId = Config.APPWRITE_PROJECT_ID;

    const response = await fetch(
        `${endpoint}/storage/buckets/${BUCKET_ID}/files`,
        {
            method: 'POST',
            headers: {
                'X-Appwrite-Project': projectId,
                // Session cookie is sent automatically by the Appwrite SDK
                // Do NOT set Content-Type manually — fetch sets the boundary automatically
            },
            body: formData,
        }
    );

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `Upload failed: ${response.status}`);
    }

    const data = await response.json();
    return data.$id;
};

/**
 * Delete a stored image by file ID.
 */
export const deleteImage = async (fileId) => {
    return storage.deleteFile(BUCKET_ID, fileId);
};

/**
 * Get a direct preview URL for a stored image.
 * Constructs the URL manually to ensure the project ID is included,
 * which is required for React Native's Image component.
 * @param {string} fileId
 * @returns {string} Image URL string
 */
export const getImageUrl = (fileId) => {
    if (!fileId) return null;
    const endpoint = Config.APPWRITE_ENDPOINT;
    const projectId = Config.APPWRITE_PROJECT_ID;
    return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${projectId}`;
};

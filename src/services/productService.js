import { databases } from '../config/appwrite';
import { APPWRITE } from '../config/appwrite';
import { ID, Query } from 'appwrite';

const { DATABASE_ID, COLLECTION_ID } = APPWRITE;

/**
 * List products belonging to a specific user.
 * Optionally filter by search query on the 'name' field.
 * @param {string} userId - The current user's account ID
 * @param {string} search - Optional search term
 */
export const listProducts = async (userId, search = '') => {
    const queries = [Query.equal('userId', userId)];
    if (search.trim()) {
        queries.push(Query.search('name', search.trim()));
    }
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, queries);
    return res.documents;
};

/**
 * Fetch a single product by document ID.
 */
export const getProduct = async (id) => {
    return databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
};

/**
 * Create a new product document.
 * @param {object} data - { name, price, quantity, category, imageId, userId }
 */
export const createProduct = async (data) => {
    return databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
};

/**
 * Update an existing product document by ID.
 * userId is omitted from updates (owner never changes).
 */
export const updateProduct = async (id, data) => {
    return databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
};

/**
 * Delete a product document by ID.
 */
export const deleteProduct = async (id) => {
    return databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
};

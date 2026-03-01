import { account } from '../config/appwrite';
import { ID } from 'appwrite';

/**
 * Register a new user then immediately log them in.
 */
export const signup = async (name, email, password) => {
    await account.create(ID.unique(), email, password, name);
    return login(email, password);
};

/**
 * Create an email/password session (login).
 * Returns the newly created session object.
 */
export const login = async (email, password) => {
    return account.createEmailPasswordSession(email, password);
};

/**
 * Delete the current session (logout).
 */
export const logout = async () => {
    return account.deleteSession('current');
};

/**
 * Fetch the currently authenticated user.
 * Returns null if no session exists (i.e. not logged in).
 */
export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch {
        return null;
    }
};

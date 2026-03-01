import { Client, Account, Databases, Storage } from 'appwrite';
import Config from 'react-native-config';

const client = new Client()
    .setEndpoint(Config.APPWRITE_ENDPOINT)
    .setProject(Config.APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const APPWRITE = {
    DATABASE_ID: Config.APPWRITE_DATABASE_ID,
    COLLECTION_ID: Config.APPWRITE_COLLECTION_ID,
    BUCKET_ID: Config.APPWRITE_BUCKET_ID,
};

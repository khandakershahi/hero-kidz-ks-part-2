const uri = process.env.MONGODB_URI;
const dbname = process.env.DB_NAME;

if (!dbname) {
    throw new Error("Please define DBNAME in .env");
}

import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const collections = {
    PRODUCTS: "products",
    USERS: "users",
};

export const dbConnect = (collectionName) => {
    return client.db(dbname).collection(collectionName);
};

"use server";

import { collections, dbConnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
    const collection = await dbConnect(collections.PRODUCTS);
    const products = await collection.find().toArray();

    return products.map(product => ({
        ...product,
        _id: product._id.toString(), // 🔥 convert ObjectId
    }));
};


export const getSingleProduct = async (id) => {
    if (!id || id.length !== 24) {
        return null;
    }

    const product = await dbConnect(collections.PRODUCTS).findOne({
        _id: new ObjectId(id),
    });

    if (!product) return null;

    // ✅ Convert Mongo ObjectId to plain object
    return {
        ...product,
        _id: product._id.toString(),
    } || {};
};

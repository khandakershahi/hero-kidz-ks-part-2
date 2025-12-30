"use client";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import CartButton from "../buttons/CartButton";

export default function ProductCard({ product, onAddToCart }) {
    const { _id, title, image, price, ratings, reviews, sold } = product;

    return (
        <div className="card w-96 bg-base-100 shadow-md hover:shadow-lg transition relative">
            <figure className="relative h-48 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    className="rounded-md w-full h-48 object-cover"
                    loading="lazy"
                    width={300}
                    height={300}
                />
            </figure>

            <div className="card-body p-4">
                <h2 className="card-title text-sm font-medium line-clamp-2">
                    {title}
                </h2>

                <div className="flex items-center gap-1 text-sm mt-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{ratings}</span>
                    <span className="text-gray-400">({reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-primary">৳{price}</span>
                    <span className="text-xs text-gray-500">Sold: {sold}</span>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-3 flex-col">

                    <CartButton product={{ ...product, _id: _id.toString() }}></CartButton>

                    <Link
                        href={`/products/${product._id}`}
                        className="btn btn-outline flex-1 flex items-center p-4 w-full"
                    >
                        <FaEye />
                        View Details
                    </Link>


                </div>
            </div>
        </div>
    );
}

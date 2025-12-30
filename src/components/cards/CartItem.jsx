"use client";

import Image from "next/image";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { deleteItemsFromCart, handleCart } from "@/actions/server/cart";
import { useRouter } from "next/navigation";

const CartItem = ({ item }) => {
    const { productId, title, image, price, quantity, _id } = item;
    const router = useRouter();

    // ➕ Increment quantity
    const handleIncrement = async () => {
        await handleCart({ product: { _id: productId }, inc: true });
        router.refresh(); // ✅ refresh cart list
    };

    // ➖ Decrement quantity
    const handleDecrement = async () => {
        if (quantity <= 1) return;
        await handleCart({ product: { _id: productId }, inc: false });
        router.refresh(); // ✅ refresh cart list
    };

    // 🗑 Remove item
    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Remove item?",
            text: title,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Remove",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        const res = await deleteItemsFromCart(_id);

        if (res?.success) {
            Swal.fire("Deleted!", "Item removed from cart", "success");
            router.refresh(); // ✅ re-fetch cart from server
        } else {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    return (
        <div className="card card-side bg-base-100 shadow-md p-4 items-center gap-4">
            {/* Image */}
            <div className="relative w-24 h-24 rounded overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
                <h2 className="font-semibold text-sm line-clamp-2">{title}</h2>
                <p className="text-primary font-bold">৳{price}</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                    <button
                        className="btn btn-xs btn-outline"
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                    >
                        <FaMinus />
                    </button>

                    <span className="px-2 font-semibold">{quantity}</span>

                    <button
                        className="btn btn-xs btn-outline"
                        onClick={handleIncrement}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>

            {/* Delete */}
            <button
                className="btn btn-sm btn-error btn-outline"
                onClick={handleDelete}
            >
                <FaTrash />
            </button>
        </div>
    );
};

export default CartItem;

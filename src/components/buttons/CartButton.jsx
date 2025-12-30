"use client"

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { handleCart } from "@/actions/server/cart";
import Swal from "sweetalert2";
import { useState } from "react";

const CartButton = ({ product }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const path = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const isLogin = session?.status === "authenticated" || !!session?.user;

    const handleAdd2Cart = async () => {
        setIsLoading(true);
        if (isLogin) {
            const result = await handleCart({ product, inc: true });
            if (result.success) {
                Swal.fire("Added to cart.", product?.title, 'success')
            } else {
                Swal.fire('error', "something error", 'error')
            }
            setIsLoading(false);
        }
        else {
            router.push(`/login?callbackUrl=${path}`);
            setIsLoading(false);
        }

    }
    return (
        <div>
            <button
                disabled={status == "loading" || isLoading}
                onClick={handleAdd2Cart} className="btn btn-primary w-full p-4">
                Add to Cart
            </button>
        </div>
    );
};

export default CartButton;
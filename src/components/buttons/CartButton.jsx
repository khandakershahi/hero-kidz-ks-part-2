"use client"

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CartButton = ({ product }) => {
    const { data: session } = useSession();
    const isLogin = session?.status === "authenticated" || !!session?.user;
    const router = useRouter();
    const path = usePathname();
    const add2Cart = () => {
        if (isLogin) alert(product._id);
        else {
            router.push(`/login?callbackUrl=${path}`);
        }

    }
    return (
        <div>
            <button
                onClick={add2Cart} className="btn btn-primary w-full mt-4">
                Add to Cart
            </button>
        </div>
    );
};

export default CartButton;
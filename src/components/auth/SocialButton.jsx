"use client";

import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";

export default function SocialButton() {
    const searchParams = useSearchParams();
    console.log(searchParams.get("callbackUrl") || "/");

    const handleSignIn = async () => {
        const result = await signIn('google', { redirect: "false", callbackUrl: searchParams.get("callbackUrl") || "/" })
        console.log(result);
        if (result.ok) {
            Swal.fire("success", "welcome", "success");
        } else {
            Swal.fire("error", "Something went wrong", "error");
        }
    };

    return (
        <button
            onClick={handleSignIn}
            className="btn btn-outline w-full flex items-center gap-2"
        >
            <FaGoogle />
            Continue with Google
        </button>
    );
}

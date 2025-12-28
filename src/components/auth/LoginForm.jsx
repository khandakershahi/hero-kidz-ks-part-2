"use client";

import { useState } from "react";
import Link from "next/link";
import SocialButton from "./SocialButton";
import { signIn } from "next-auth/react"
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";


export default function LoginForm() {
    const searchParams = useSearchParams();
    const callBack = searchParams.get("callbackUrl") || "/";

    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Login data:", form);
        // await loginUser(form);
        const result = await signIn('credentials', {
            email: form.email,
            password: form.password,
            // redirect: false,
            callbackUrl: searchParams.get("callbackUrl") || "/"
        });
        console.log(result);
        if (!result.ok) {
            Swal.fire("error", "Email Password not matched", "error")
        } else {
            Swal.fire("success", "Welcome", "success");

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-sm shadow-xl bg-base-100">
                <div className="card-body space-y-4">
                    <h2 className="card-title justify-center text-2xl">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="btn btn-primary w-full">
                            Login
                        </button>
                    </form>

                    <div className="divider">OR</div>

                    <SocialButton />

                    {/* ✅ REGISTER LINK */}
                    <p className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href={`/register?callbackUrl=${callBack}`} className="link link-primary">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

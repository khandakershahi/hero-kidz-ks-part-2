"use client";

import { useState } from "react";
import Link from "next/link";
import SocialButton from "./SocialButton";
import { useRouter, useSearchParams } from "next/navigation";
import { postUser } from "@/actions/server/auth";
import { signIn } from "next-auth/react";

export default function RegisterForm() {

    const searchParams = useSearchParams();
    const callBack = searchParams.get("callbackUrl") || "/";

    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
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
        // console.log("Register data:", form);
        const result = await postUser(form);
        if (result.acknowledged) {
            // router.push('/login');
            const result = await signIn("credentials", {
                email: form.email,
                password: form.password,
                callbackUrl: callBack
            })
            alert('successful');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-sm shadow-xl bg-base-100">
                <div className="card-body space-y-4">
                    <h2 className="card-title justify-center text-2xl">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="input input-bordered w-full"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

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
                            Register
                        </button>
                    </form>

                    <div className="divider">OR</div>

                    <SocialButton />

                    {/* ✅ LOGIN LINK */}
                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="link link-primary">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

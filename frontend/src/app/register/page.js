"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                return toast.error(data.error || "Registration failed");
            }

            login(data.data?.token, data.data?.user);
            toast.success("Registered successfully");
            router.replace("/");
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-dvw h-dvh flex justify-center items-center">
            <div className="p-6 min-w-[360px] rounded-md border border-gray-400 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-6">Register</h2>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 mb-4">
                <Input
                    
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <Input
                    
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <Input
                    
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <Button asChild={true}>
                    <button type="submit" disabled={loading}>
                        Register
                    </button>
                </Button>
            </form>

            <p>
                Already have an account? <a href="/login" className="text-blue-700">Login</a>
            </p>
            </div>
        </div>
    );
}
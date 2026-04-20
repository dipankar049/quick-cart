"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [form, setForm] = useState({
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
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
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
        return toast.error(data.error || "Login failed");
      }

      login(data.data?.token, data.data?.user);
      toast.success("Login successful");
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
        <h2 className="text-xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 mb-4">
          <Input
            
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <Button asChild={true}>
            <button type="submit" disabled={loading}>
              Login
            </button>
          </Button>
        </form>

        <p>
          Don’t have an account? <a href="/register" className="text-blue-700">Register</a>
        </p>
      </div>
    </div>
  );
}
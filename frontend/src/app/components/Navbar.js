"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const initial = user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="w-full p-4 flex justify-between bg-sky-300">
      <Link href="/" className="text-2xl font-bold">
        Quick Cart
      </Link>

      <div>
        {!token ? (
          <div className="flex gap-2">
            <Button asChild={true} variant={'secondary'}>
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button asChild={true} variant={'default'}>
              <Link href="/register">
                Register
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            {/* <div className="bg-">{initial}</div> */}
            <Button asChild={true} variant={'default'}>
              <button onClick={logout}>
                Logout
              </button>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
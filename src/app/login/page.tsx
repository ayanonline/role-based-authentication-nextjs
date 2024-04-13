"use client";

import { useAuthStore } from "@/providers/auth-store-provider";
import { signin } from "@/services/dispatch";
import { getUserDetails, saveSession, setItem } from "@/services/session";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

type FormData = { email: string; password: string };

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<FormData>({
    email: "",
    password: "",
  });

  const {
    setIsLoggedIn,
    setUser,
    setLoading: setAuthLoading,
  } = useAuthStore((state) => state);

  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((f) => ({ ...f, [name]: value }));
  };
  const handleSubmit = () => {
    setLoading(true);
    signin(formdata)
      .then((res) => {
        console.log({ res });
        saveSession(res.ACCESS_TOKEN);
        setIsLoggedIn(true);
        setUser(getUserDetails());
        setAuthLoading(false);
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-screen">
      <div className="w-1/5 mx-auto mt-20 flex flex-col gap-4 py-4 px-2">
        <input
          type="text"
          placeholder="email"
          className="border px-4 py-3 outline-none"
          name="email"
          value={formdata.email}
          onChange={handleOnChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border px-4 py-3 outline-none"
          name="password"
          value={formdata.password}
          onChange={handleOnChange}
        />
        <button
          className="border px-4 py-3 bg-black text-white font-bold text-lg"
          onClick={handleSubmit}
        >
          {loading ? "..." : "Login"}
        </button>
      </div>
    </div>
  );
}

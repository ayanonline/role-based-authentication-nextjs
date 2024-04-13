"use client";

import Protected from "@/components/protected";
import { useAuthStore } from "@/providers/auth-store-provider";

function Home() {
  const { user } = useAuthStore((state) => state);
  return (
    <main>
      <h1 className="text-center">
        Welcome <span>{user?.FIRST_NAME + " " + user?.LAST_NAME}</span>
      </h1>
    </main>
  );
}

export default Protected(Home);

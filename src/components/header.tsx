"use client";

import { useAuthStore } from "@/providers/auth-store-provider";
import { deleteSession } from "@/services/session";
import Link from "next/link";
import rolesData from "@/data/roles.json";

export default function Header() {
  const { loading, isLoggedIn, user, setIsLoggedIn, setUser } = useAuthStore(
    (store) => store
  );

  const handleLogout = () => {
    deleteSession();
    setIsLoggedIn(false);
    setUser(null);
  };
  // console.log({ isLoggedIn, user, loading });

  const [userRolePermission] = rolesData?.filter((item) =>
    user?.ROLE.ROLES?.includes(item.role)
  );

  return (
    <header className="flex justify-between items-center py-4 px-20">
      <h1 className="text-4xl font-bold">Logo</h1>

      <nav>
        <ul className="flex items-center gap-6 text-xl">
          {userRolePermission?.menu?.map((menu) => {
            return (
              <li>
                <Link href={menu.slug}>{menu.label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div>
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            {isLoggedIn ? (
              <div className="flex gap-4 items-center">
                <img
                  src={user?.IMAGE}
                  height={100}
                  width={100}
                  className="object-cover rounded-full h-10 w-10"
                />

                <button
                  onClick={handleLogout}
                  className="bg-black text-white px-2 py-1 rounded-md"
                >
                  logout
                </button>
              </div>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}

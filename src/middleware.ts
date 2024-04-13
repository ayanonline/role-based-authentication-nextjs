import { NextRequest, NextResponse } from "next/server";
import { getTokenDetails } from "./services/session";
import rolesData from "@/data/roles.json";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("access_token");
  const user = getTokenDetails(token?.value!);

  const [userRolePermission] = rolesData?.filter((item) =>
    user?.ROLE?.ROLES?.includes(item.role)
  );

  const protectedRoutes = ["/", "/admin"];
  const loginRoutes = ["/login", "/signup"];

  // If not authenticated
  if (!user && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If authenticated and trying to access login page then redirect to home page
  if (user && loginRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If authenticated then check user have access to the route or not
  if (user && !userRolePermission?.routes?.includes(path)) {
    return NextResponse.redirect(new URL("/403", request.nextUrl));
  }
}

export const config = {
  matcher: ["/about", "/", "/admin", "/login"],
};

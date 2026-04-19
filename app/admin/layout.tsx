import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies(); // 👈 FIX
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.AUTH_SECRET)
    );
  } catch {
    redirect("/login");
  }

  return <>{children}</>;
}
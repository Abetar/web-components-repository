import { NextRequest } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.AUTH_SECRET));

    return Response.json({ token });
  }

  return Response.json(
    { error: "Credenciales inválidas" },
    { status: 401 }
  );
}
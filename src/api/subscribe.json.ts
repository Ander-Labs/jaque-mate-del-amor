// /src/pages/api/subscribe.ts
import type { APIRoute } from "astro";
import { turso } from "../config/turso";

export const post: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ message: "Correo electrónico no válido" }),
        { status: 400 }
      );
    }

    // Ejecuta la inserción directa con interpolación de variables
    await turso.execute(`INSERT INTO subscribers (email) VALUES ('${email}')`);

    return new Response(JSON.stringify({ message: "Suscripción exitosa" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al almacenar el correo:", error);
    return new Response(
      JSON.stringify({ message: "Error al almacenar el correo" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

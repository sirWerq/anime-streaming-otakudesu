import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(
    request: NextRequest,
    { params }: { params: { genre_slug: string; page: string } }
) {
    const headersList = await headers();
    const referer = headersList.get("referer");

    const validURL = process.env.NEXT_PUBLIC_BASE_URL;

    if (!validURL) {
        return Response.json(
            { message: "Server configuration error" },
            { status: 500 }
        );
    }

    if (!referer || !referer.startsWith(validURL)) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const parameters = await params;

    const genre = parameters.genre_slug;
    const page = parameters.page;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/genres/${genre}/${page}`
    );
    const data = await response.json();
    const transformed = { ...data, source: "proxied-through-nextjs" };

    return new Response(JSON.stringify(transformed), {
        headers: { "Content-Type": "application/json" },
    });
}

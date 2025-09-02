import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { genre_slug: string; page: string } }
) {
    const genre = params.genre_slug;
    const page = params.page;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/genres/${genre}/${page}`
    );
    const data = await response.json();
    const transformed = { ...data, source: "proxied-through-nextjs" };

    return new Response(JSON.stringify(transformed), {
        headers: { "Content-Type": "application/json" },
    });
}

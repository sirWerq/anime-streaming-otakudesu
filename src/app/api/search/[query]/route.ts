import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { query: string } }
) {
    const query = await params.query;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/search/${query}`
    );
    const data = await response.json();
    const transformed = { ...data, source: "proxied-through-nextjs" };
    return new Response(JSON.stringify(transformed), {
        headers: { "Content-Type": "application/json" },
    });
}

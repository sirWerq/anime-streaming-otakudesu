import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { page: string } }
) {
    const page = params.page;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/ongoing-anime/${page}`
    );
    const data = await response.json();
    const transformed = { ...data, source: "proxied-through-nextjs" };
    return new Response(JSON.stringify(transformed), {
        headers: { "Content-Type": "application/json" },
    });
}

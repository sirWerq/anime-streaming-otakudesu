import { redirect } from "next/navigation";
import AnimeStreamingComponent from "./component";
import { Metadata } from "next";
import { checkString } from "@/utils";

export async function generateMetadata({
    params,
}: {
    params: { anime_slug: string; episode: string };
}): Promise<Metadata> {
    const { anime_slug, episode } = await params;
    let data;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/anime/${anime_slug}/episodes/${episode}`
        );
        const responseJson = await response.json();
        data = responseJson.data;
    } catch (err) {
        console.error("Failed to fetch streaming data for metadata:", err);
    }

    if (!data) {
        return {
            title: "Streaming Anime",
            description: "Halaman streaming anime tidak ditemukan.",
        };
    }

    return {
        title: `Nonton ${data.episode}`,
        description: checkString(
            `Nonton anime ${data.episode} secara gratis. Streaming ${data.episode} full HD di RifqiNime, situs nonton anime sub Indo terbaik.`
        ),
    };
}

export default async function AnimeStreamingPage({
    params,
}: {
    params: Promise<{ anime_slug: string; episode: string }>;
}) {
    const { anime_slug, episode } = await params;
    let data;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/anime/${anime_slug}/episodes/${episode}`
        );
        const responseJson = await response.json();
        data = responseJson.data;
    } catch (err) {
        console.log(err);
        redirect(`/not-found`);
    }

    return <AnimeStreamingComponent data={data} />;
}

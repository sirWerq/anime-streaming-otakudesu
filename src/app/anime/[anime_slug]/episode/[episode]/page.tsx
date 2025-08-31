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

    const episodeNumber = episode.split("-").pop();

    return {
        title: `Nonton ${data.anime_title} Episode ${episodeNumber} Sub Indo`,
        description: checkString(
            `Nonton anime ${data.anime_title} episode ${episodeNumber} subtitle Indonesia secara gratis. Streaming ${data.anime_title} full HD di RifqiNime, situs nonton anime sub Indo terbaik.`
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

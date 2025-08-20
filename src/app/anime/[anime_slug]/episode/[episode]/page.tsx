/* eslint-disable @typescript-eslint/no-unused-vars */
import { redirect } from "next/navigation";
import AnimeStreamingComponent from "./component";

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
        redirect(`/not-found`);
    }

    return <AnimeStreamingComponent data={data} />;
}

import AnimeStreamingComponent from "./component";

export default async function AnimeStreamingPage({
    params,
}: {
    params: Promise<{ anime_slug: string; episode: string }>;
}) {
    const { anime_slug, episode } = await params;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/anime/${anime_slug}/episodes/${episode}`
    );
    const responseJson = await response.json();
    const data = responseJson.data;

    return <AnimeStreamingComponent data={data} />;
}

import AnimeDetailsPageComponent from "./component";

export default async function AnimeDetailsPage({
    params,
}: {
    params: Promise<{ anime_slug: string }>;
}) {
    const { anime_slug } = await params;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/anime/${anime_slug}`
    );
    const datas = await response.json();

    return <AnimeDetailsPageComponent data={datas.data} />;
}

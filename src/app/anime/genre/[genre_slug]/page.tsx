import AnimeByGenreComponent from "./component";

export default async function AnimeByGenre({
    params,
}: {
    params: Promise<{ genre_slug: string }>;
}) {
    const { genre_slug } = await params;
    const pageTitle = genre_slug.replace(/-/g, " ");

    return <AnimeByGenreComponent pageTitle={pageTitle} genre={genre_slug} />;
}

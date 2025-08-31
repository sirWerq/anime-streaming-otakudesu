import { Metadata } from "next";
import AnimeByGenreComponent from "./component";

export async function generateMetadata({
    params,
}: {
    params: { genre_slug: string };
}): Promise<Metadata> {
    const { genre_slug } = await params;
    const genreName = genre_slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
        title: `Daftar Anime Genre ${genreName} Sub Indo`,
        description: `Temukan koleksi lengkap anime dengan genre ${genreName}. Nonton dan download serial anime favoritmu dari berbagai pilihan genre terbaik di RifqiNime.`,
    };
}

export default async function AnimeByGenre({
    params,
}: {
    params: Promise<{ genre_slug: string }>;
}) {
    const { genre_slug } = await params;
    const pageTitle = genre_slug.replace(/-/g, " ");

    return <AnimeByGenreComponent pageTitle={pageTitle} genre={genre_slug} />;
}

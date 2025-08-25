export default async function AnimeByGenre({
    params,
}: {
    params: Promise<{ genre_slug: string }>;
}) {
    const { genre_slug } = await params;
    const pageTitle = genre_slug.replace(/-/g, " ");
    let data;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/genres/${genre_slug}`
        );
        const responseJson = await response.json();
        data = responseJson.data;
    } catch (err) {
        // redirect(`/not-found`);
        console.log(err);
    }

    console.log(data);

    return (
        <div className="min-h-svh w-full px-4 pb-20 pt-28 md:px-16">
            <h1 className="mb-4 text-lg font-bold md:text-xl lg:text-2xl">
                Genre: <span className="capitalize">{pageTitle}</span>
            </h1>
        </div>
    );
}

import { CardAnimeHome, Genre } from "@/models/global";

export const generateDataWithPagination = async (
    host: string | null,
    section: string,
    apiEndpoint: string
) => {
    try {
        const firstPageResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/${apiEndpoint}/1`
        );
        const firstPageData = await firstPageResponse.json();
        const totalPage = firstPageData.pagination.last_visible_page;
        let allAnimeSitemap = firstPageData.data.map((data: CardAnimeHome) => ({
            url: `https://${host}/${section}/${data.slug}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.7,
        }));

        const fetchPromises = [];
        for (let i = 2; i <= totalPage; i++) {
            fetchPromises.push(
                fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL_BE}/${apiEndpoint}/${i}`
                )
            );
        }

        const responses = await Promise.all(fetchPromises);
        for (const response of responses) {
            const recursiveJson = await response.json();
            const tempData = recursiveJson.data.map((data: CardAnimeHome) => ({
                url: `https://${host}/${section}/${data.slug}`,
                lastModified: new Date(),
                changeFrequency: "daily",
                priority: 0.7,
            }));
            allAnimeSitemap = [...allAnimeSitemap, ...tempData];
        }

        return allAnimeSitemap;
    } catch (err) {
        console.error(`Error generating sitemap for ${section}:`, err);
        return [];
    }
};

export const generateData = async (host: string | null) => {
    let objectGenreSitemap;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/genres`
        );
        const responseJson = await response.json();
        objectGenreSitemap = responseJson.data.map((genre: Genre) => ({
            url: `https://${host}/anime/genres/${genre.slug}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        }));
    } catch (err) {
        console.log(err);
        return null;
    }
    return objectGenreSitemap;
};

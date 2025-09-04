import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { generateData, generateDataWithPagination } from "@/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const headersList = await headers();
    const host = headersList.get("host");

    const objectGenreSitemap = await generateData(host);
    const objectOngoingAnimeSlug = await generateDataWithPagination(
        host,
        "anime",
        "v1/ongoing-anime"
    );
    const objectCompleteAnimeSlug = await generateDataWithPagination(
        host,
        "anime",
        "v1/complete-anime"
    );

    const genreSitemap = objectGenreSitemap || [];
    const animeOngoingSitemap = objectOngoingAnimeSlug || [];
    const animeCompleteSitemap = objectCompleteAnimeSlug || [];

    return [
        {
            url: `https://${host}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `https://${host}/ongoing-anime`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `https://${host}/completed-anime`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `https://${host}/genres`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.7,
        },
        ...genreSitemap,
        ...animeOngoingSitemap,
        ...animeCompleteSitemap,
        {
            url: `https://${host}/search`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.7,
        },
    ];
}

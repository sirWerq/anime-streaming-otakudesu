import { Genre } from "@/models/global";
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const headersList = await headers();
    const host = headersList.get("host");

    let objectGenreSitemap;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/genres`
        );
        const responseJson = await response.json();
        const responseGenre = responseJson.data;
        objectGenreSitemap = responseGenre.map((genre: Genre) => ({
            url: `https://${host}/anime/genres/${genre}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        }));
    } catch (err) {
        console.log(err);
    }

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
        ...objectGenreSitemap,
        {
            url: `https://${host}/search`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.7,
        },
    ];
}

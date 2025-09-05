"use client";

import axios from "axios";
import { redirect, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Card, Pagination, LoadingComponent } from "@/components";
import { CardAnimeHome } from "@/models/global";

const fetcher = async (url: string) => {
    const { data } = await axios.get(url);
    return data;
};

export default function AnimeByGenreComponent({
    pageTitle,
    genre,
}: {
    pageTitle: string;
    genre: string;
}) {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");

    const { data, error, isLoading } = useSWR(
        `/api/anime/genres/${genre}/${page}`,
        fetcher
    );

    if (isLoading) return <LoadingComponent />;

    if (error || !data) {
        redirect("/not-found");
    }

    return (
        <div className="pb-20 pt-28 px-4 lg:px-16 min-h-svh w-full">
            <h1 className="mb-4 text-lg font-bold md:text-xl lg:text-2xl">
                Genre: <span className="capitalize">{pageTitle}</span>
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-y-10 lg:gap-x-20 gap-2 mt-10">
                {data.data.anime.map((anime: CardAnimeHome, index: number) => (
                    <Card
                        data={anime}
                        key={anime.slug}
                        isPriority={index === 0}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
                <Pagination
                    page={page}
                    data={data.data.pagination}
                    route={`anime/genre/${genre}`}
                />
            </div>
        </div>
    );
}

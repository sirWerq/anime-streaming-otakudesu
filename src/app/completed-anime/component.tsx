"use client";

import axios from "axios";
import Image from "next/image";
import { redirect, useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { Card, Pagination, LoadingComponent } from "@/components";
import { ApiListResponse, CardAnimeHome } from "@/models/global";
import { useState } from "react";

const fetcher = async (url: string): Promise<ApiListResponse> => {
    const { data } = await axios.get(url);
    return data;
};

export default function CompletedAnimeComponent() {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const router = useRouter();
    const [querySearch, setQuerySearch] = useState<string>("");

    const { data, error, isLoading } = useSWR<ApiListResponse>(
        `/api/completed-anime/${page}`,
        fetcher
    );

    if (isLoading) return <LoadingComponent />;

    if (error || !data) {
        redirect("/not-found");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (querySearch.trim()) {
            router.push(`/search?query=${querySearch}`);
        }
    };

    return (
        <div className="pb-20 pt-28 px-4 lg:px-16 min-h-svh w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
                <h1 className="text-2xl lg:text-3xl font-bold text-center lg:text-left">
                    Completed Anime
                </h1>
                <form
                    className="relative w-full md:w-auto"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <input
                        type="text"
                        className="bg-tertiary focus:outline-none w-full md:w-[410px] h-11 px-2 rounded"
                        placeholder="Search..."
                        value={querySearch}
                        onChange={(e) => setQuerySearch(e.target.value)}
                    />
                    <Image
                        src="/search.svg"
                        alt="search icon"
                        height={25}
                        width={25}
                        className="absolute top-1/2 -translate-y-1/2 right-4 h-[25px] w-[25px]"
                        onClick={() => {
                            if (querySearch.trim()) {
                                router.push(`/search?query=${querySearch}`);
                            }
                        }}
                    />
                </form>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-y-10 lg:gap-x-20 gap-2 mt-10">
                {data.data.map((anime: CardAnimeHome, index: number) => (
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
                    data={data.pagination}
                    route="completed-anime"
                />
            </div>
        </div>
    );
}

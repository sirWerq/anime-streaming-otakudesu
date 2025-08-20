"use client";
import axios from "axios";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import useSWR from "swr";

import Loading from "../loading";
import { Card, Pagination } from "@/components";
import { ApiListResponse, CardAnimeHome } from "@/models/global";

const fetcher = async (url: string): Promise<ApiListResponse> => {
    const { data } = await axios.get(url);
    return data;
};

export default function OngoingAnimeComponent() {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");

    const { data, error, isLoading } = useSWR<ApiListResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/ongoing-anime/${page}`,
        fetcher
    );

    if (isLoading) return <Loading />;

    if (error || !data) {
        redirect("/not-found");
    }

    return (
        <div className="pb-20 pt-28 px-4 lg:px-16 min-h-svh w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center lg:text-left">
                    On<span className="text-quaternary">Going</span> Anime
                </h1>
                <form action="" className="relative w-full md:w-auto">
                    <input
                        type="text"
                        className="bg-tertiary focus:outline-none w-full md:w-[410px] h-11 px-2 rounded"
                        placeholder="Search..."
                    />
                    <Image
                        src="/search.svg"
                        alt="search icon"
                        height={25}
                        width={25}
                        className="absolute top-1/2 -translate-y-1/2 right-4 h-[25px] w-[25px]"
                    />
                </form>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-y-10 lg:gap-x-20 mt-10">
                {data.data.map((anime: CardAnimeHome) => (
                    <Card data={anime} key={anime.slug} />
                ))}
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
                <Pagination
                    page={page}
                    data={data.pagination}
                    route="ongoing-anime"
                />
            </div>
        </div>
    );
}

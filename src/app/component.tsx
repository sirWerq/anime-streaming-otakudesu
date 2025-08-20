"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";

import { HomeAnimeSection, Loading } from "@/components";
import { HomeApiResponse } from "@/models/global";

const fetcher = async (url: string): Promise<HomeApiResponse> => {
    const { data } = await axios.get(url);
    return data;
};

export default function HomeComponent() {
    const router = useRouter();
    const [querySearch, setQuerySearch] = useState<string>("");

    const { data, error, isLoading } = useSWR<HomeApiResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/home`,
        fetcher
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (querySearch.trim()) {
            router.push(`/search?query=${querySearch}`);
        }
    };

    if (isLoading) return <Loading />;

    if (error || !data) {
        return (
            <div className="flex justify-center items-center min-h-svh">
                Gagal memuat data. Silakan coba lagi nanti.
            </div>
        );
    }

    return (
        <div className="pb-20 pt-28 px-4 lg:px-16 min-h-svh w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center lg:text-left">
                    Selamat Datang di{" "}
                    <span className="text-quaternary">RifqiNime</span>,{" "}
                    <br className="block md:hidden" />
                    <br className="hidden md:block" />
                    Platform Anime Subtitle Indonesia Terlengkap.
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="relative w-full md:w-auto"
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
                        className="absolute top-1/2 -translate-y-1/2 right-4 h-[25px] w-[25px] cursor-pointer"
                        onClick={() => {
                            if (querySearch.trim()) {
                                router.push(`/search?query=${querySearch}`);
                            }
                        }}
                    />
                </form>
            </div>

            <HomeAnimeSection
                data={data.data.ongoing_anime}
                title="Ongoing Anime"
            />
            <HomeAnimeSection
                data={data.data.complete_anime}
                title="Completed Anime"
            />
        </div>
    );
}

import { HomeAnimeSection } from "@/components";
import Image from "next/image";

export async function OngoingAnimeDataFetcher() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/home`,
        {
            cache: "no-store",
        }
    );
    const data = await response.json();

    return (
        <HomeAnimeSection
            data={data.data.ongoing_anime}
            title="Ongoing Anime"
        />
    );
}

export async function CompletedAnimeDataFetcher() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/home`,
        {
            cache: "no-store",
        }
    );
    const data = await response.json();

    return (
        <HomeAnimeSection
            data={data.data.complete_anime}
            title="Completed Anime"
        />
    );
}

export default function Home() {
    return (
        <div className="pb-20 pt-28 px-4 md:px-16 min-h-svh w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
                    Selamat Datang di{" "}
                    <span className="text-quaternary">RifqiNime</span>,{" "}
                    <br className="block md:hidden" />
                    <br className="hidden md:block" />
                    Platform Anime Subtitle Indonesia Terlengkap.
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
            <OngoingAnimeDataFetcher />
            <CompletedAnimeDataFetcher />
        </div>
    );
}

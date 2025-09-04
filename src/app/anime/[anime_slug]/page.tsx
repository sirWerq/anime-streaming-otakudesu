import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components";
import { ApiResponse } from "@/models/global";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { checkString } from "@/utils";

export async function generateMetadata({
    params,
}: {
    params: { anime_slug: string };
}): Promise<Metadata> {
    const { anime_slug } = await params;
    let data;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/anime/${anime_slug}`
        );
        const responseJson: ApiResponse = await response.json();
        data = responseJson.data;
    } catch (error) {
        console.error("Failed to fetch anime data for metadata:", error);
    }

    if (!data) {
        return {
            title: "Anime Tidak Ditemukan",
            description: "Halaman yang Anda cari tidak tersedia di RifqiNime.",
        };
    }

    const genres = data.genres.map((genre) => genre.name).join(", ");
    const description = checkString(
        `Nonton dan download anime ${data.title} (${data.japanese_title}) sub Indo. Sinopsis, episode lengkap, genre ${genres}, rating ${data.rating}, dan status ${data.status}. Streaming kualitas HD hanya di RifqiNime.`
    );

    return {
        title: `${data.title} Sub Indo | Nonton & Download Anime`,
        description: description,
    };
}

export default async function AnimeDetailsPage({
    params,
}: {
    params: Promise<{ anime_slug: string }>;
}) {
    const { anime_slug } = await params;
    let data;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/anime/${anime_slug}`
        );
        const responseJson: ApiResponse = await response.json();
        data = responseJson.data;
    } catch (err) {
        console.log(err);
        redirect(`/not-found`);
    }

    return (
        <div className="pb-20 pt-28 px-4 md:px-16 min-h-svh w-full">
            <div className="flex flex-col lg:flex-row justify-between gap-10">
                <div className="flex-1 space-y-4 order-2 lg:order-1">
                    <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
                        <div className="space-y-1">
                            <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
                                {data.title}
                            </h1>
                            <p className="text-black/70 text-sm text-center md:text-left">
                                {data.japanese_title}
                            </p>
                        </div>
                        <p className="text-black/70 text-center md:text-right">
                            Release: {data.release_date}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Synopsis</h2>
                        <p>{data.synopsis ? data.synopsis : "-"}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Genres</h2>
                        <div className="flex gap-2 flex-wrap">
                            {data.genres.map((genre, index) => (
                                <Link
                                    href={`/anime/genre/${genre.name}`}
                                    key={index}
                                    className="rounded bg-quaternary py-2 px-4"
                                >
                                    <p>{genre.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">
                            Other Information
                        </h2>
                        <div className="flex gap-2 flex-wrap">
                            <div className="rounded bg-quaternary py-2 px-4 flex items-center gap-2">
                                <div className="space-x-1 flex items-center">
                                    <Image
                                        src="/star.svg"
                                        alt="star icon"
                                        width={16}
                                        height={16}
                                    />
                                    <span>:</span>
                                </div>
                                <p>{data.rating ? data.rating : "-"}</p>
                            </div>
                            <div className="rounded bg-quaternary py-2 px-4 flex items-center gap-2">
                                <div className="space-x-1 flex items-center">
                                    <Image
                                        src="/tv.svg"
                                        alt="type icon"
                                        width={16}
                                        height={16}
                                    />
                                    <span>:</span>
                                </div>
                                <p>{data.type}</p>
                            </div>
                            <div className="rounded bg-quaternary py-2 px-4 flex items-center gap-2">
                                <div className="space-x-1 flex items-center">
                                    <Image
                                        src="/file.svg"
                                        alt="episode icon"
                                        width={16}
                                        height={16}
                                        className="text-black"
                                    />
                                    <span>:</span>
                                </div>
                                <p>
                                    {data.episode_count === "Unknown"
                                        ? "- Episode"
                                        : data.episode_count + " Episode"}
                                </p>
                            </div>
                            <div className="rounded bg-quaternary py-2 px-4 flex items-center gap-2">
                                <div className="space-x-1 flex items-center">
                                    <Image
                                        src={
                                            data.status === "Ongoing"
                                                ? "/flash.svg"
                                                : data.status === "Completed"
                                                ? "/check.svg"
                                                : "/x.svg"
                                        }
                                        alt="status icon"
                                        width={16}
                                        height={16}
                                        className="text-black"
                                    />
                                    <span>:</span>
                                </div>
                                <p>{data.status}</p>
                            </div>
                            <div className="rounded bg-quaternary py-2 px-4 flex items-center gap-2">
                                <div className="space-x-1 flex items-center">
                                    <Image
                                        src="/clock.svg"
                                        alt="duration icon"
                                        width={16}
                                        height={16}
                                        className="text-black"
                                    />
                                    <span>:</span>
                                </div>
                                <p>{data.duration}</p>
                            </div>
                            <div className="rounded bg-quaternary py-2 px-4 flex items-center gap-2">
                                <div className="space-x-1 flex items-center">
                                    <Image
                                        src="/chromecast.svg"
                                        alt="studio icon"
                                        width={16}
                                        height={16}
                                        className="text-black"
                                    />
                                    <span>:</span>
                                </div>
                                <p>{data.studio}</p>
                            </div>
                            <div className="rounded bg-quaternary py-2 px-4 flex items-center gap-2">
                                <div className="space-x-1 flex items-center">
                                    <Image
                                        src="/user-profile.svg"
                                        alt="produser icon"
                                        width={16}
                                        height={16}
                                        className="text-black"
                                    />
                                    <span>:</span>
                                </div>
                                <p>{data.produser}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto lg:mx-0 order-1 lg:order-2 border">
                    <Image
                        src={data.poster}
                        alt={`${data.title} poster`}
                        width={256}
                        height={350}
                        style={{ width: "auto", height: "100%" }}
                        className="w-64 h-auto lg:w-[350px] lg:h-auto rounded shadow-xl"
                        priority
                    />
                </div>
            </div>
            <div className="space-y-1 mt-4">
                <h2 className="text-lg font-semibold">Episodes</h2>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                    {data.episode_lists.map((episode, index) => (
                        <Link
                            href={`${anime_slug}/episode/${index + 1}`}
                            key={episode.slug}
                            className="rounded bg-secondary flex items-center justify-center h-10 border hover:bg-quaternary transition-colors"
                        >
                            {index + 1}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="space-y-1 mt-4">
                <h2 className="text-lg font-semibold">Batch</h2>
                {data.batch ? (
                    <Link
                        // href={data.batch ? data.batch.slug : "#"}
                        href="#"
                        className={`rounded bg-secondary px-4 h-10 flex w-32 items-center justify-center border hover:bg-quaternary transition-colors`}
                    >
                        Click here
                    </Link>
                ) : (
                    <p className="px-4">-</p>
                )}
            </div>
            <div className="space-y-1 mt-4">
                <h2 className="text-lg font-semibold">Recommendations</h2>
                <div className="flex flex-wrap gap-4 pb-4">
                    {data.recommendations.map((recommendation) => (
                        <Card data={recommendation} key={recommendation.slug} />
                    ))}
                </div>
            </div>
        </div>
    );
}

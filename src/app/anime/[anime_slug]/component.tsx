"use client";

import { Card } from "@/components";
import { AnimeDetails } from "@/models/global";
import { regexEpisode } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function AnimeDetailsPageComponent({
    data,
}: {
    data: AnimeDetails;
}) {
    console.log(data);
    return (
        <div className="pb-20 pt-28 px-4 md:px-16 min-h-svh w-full">
            <div className="flex justify-between gap-10">
                <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                        <div className="space-y-1">
                            <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
                                {data.title}
                            </h1>
                            <p className="text-black/70 text-sm">
                                {data.japanese_title}
                            </p>
                        </div>
                        <p className="text-black/70">
                            Release: {data.release_date}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Synopsis</h2>
                        <p>{data.synopsis ? data.synopsis : "-"}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Genres</h2>
                        <div className="flex gap-2">
                            {data.genres.map((genre, index) => (
                                <div
                                    key={index}
                                    className="rounded bg-quaternary py-2 px-4"
                                >
                                    <p>{genre.name}</p>
                                </div>
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
                <Image
                    src={data.poster}
                    alt={`${data.title} poster`}
                    width={500}
                    height={500}
                    className="w-[500px] h-[500px] rounded shadow-xl"
                />
            </div>
            <div className="space-y-1">
                <h2 className="text-lg font-semibold">Episodes</h2>
                <div className="grid grid-cols-10 gap-4">
                    {data.episode_lists.map((episode) => (
                        <Link
                            href={episode.slug}
                            key={episode.slug}
                            className="rounded bg-secondary flex items-center justify-center h-10 border"
                        >
                            Episode {regexEpisode(episode.slug)}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="space-y-1 mt-4">
                <h2 className="text-lg font-semibold">Batch</h2>
                {data.batch ? (
                    <Link
                        href={data.batch ? data.batch.slug : "#"}
                        className={`rounded bg-secondary px-4 h-10 flex w-32 items-center justify-center border`}
                    >
                        Click here
                    </Link>
                ) : (
                    <p className="px-4">-</p>
                )}
            </div>
            <div className="space-y-1 mt-4">
                <h2 className="text-lg font-semibold">Recommendations</h2>
                <div className="flex gap-4">
                    {data.recommendations.map((recommendation) => (
                        <Card data={recommendation} key={recommendation.slug} />
                    ))}
                </div>
            </div>
        </div>
    );
}

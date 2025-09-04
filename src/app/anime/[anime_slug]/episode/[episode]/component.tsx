"use client";

import { AnimeStreamingData } from "@/models/global";
import Link from "next/link";
import { Fragment, useState } from "react";

const columns = ["mp4", "mkv"] as const;

export default function AnimeStreamingComponent({
    data,
}: {
    data: AnimeStreamingData;
}) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="pb-20 pt-28 px-4 md:px-16 min-h-svh w-full">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
                {data.episode}
            </h1>
            <div className="flex flex-col gap-10">
                <div className="space-y-4">
                    <div className="aspect-video rounded-md w-full xl:h-[600px] bg-black">
                        {isPlaying ? (
                            <iframe
                                src={`${data.stream_url}&autoplay=1`}
                                className="w-full h-full"
                                allowFullScreen
                                allow="autoplay"
                            />
                        ) : (
                            <div
                                onClick={() => setIsPlaying(true)}
                                className="w-full h-full flex items-center justify-center cursor-pointer group"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-10 h-10 text-white ml-1"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-4 justify-between lg:justify-end">
                        <Link
                            href={
                                data.has_previous_episode &&
                                data.previous_episode
                                    ? data.previous_episode.slug
                                    : "#"
                            }
                            className={`rounded bg-secondary flex items-center justify-center h-9 px-3 text-sm md:h-10 md:px-4 md:text-base border ${
                                !data.has_previous_episode
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-tertiary"
                            }`}
                            onClick={(e) =>
                                !data.has_previous_episode && e.preventDefault()
                            }
                        >
                            Prev Episode
                        </Link>
                        <Link
                            href={
                                data.has_next_episode && data.next_episode
                                    ? data.next_episode.slug
                                    : "#"
                            }
                            className={`rounded bg-secondary flex items-center justify-center h-9 px-3 text-sm md:h-10 md:px-4 md:text-base border ${
                                !data.has_next_episode
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-tertiary"
                            }`}
                            onClick={(e) =>
                                !data.has_next_episode && e.preventDefault()
                            }
                        >
                            Next Episode
                        </Link>
                    </div>
                </div>
                <div className="space-y-4 xl:space-y-1">
                    {columns.map((column) =>
                        data.download_urls[column].map((type, j) => (
                            <Fragment key={`${column}-${j}`}>
                                <h2 className="text-base md:text-lg font-semibold">
                                    Download {column === "mp4" ? "MP4" : "MKV"}{" "}
                                    {type.resolution}
                                </h2>
                                <div className="flex gap-4 flex-wrap">
                                    {type.urls.map((url, k) => (
                                        <Link
                                            href={url.url}
                                            key={`${column}-${j}-${k}`}
                                            className="rounded bg-secondary flex items-center justify-center h-9 px-3 text-sm md:h-10 md:px-4 md:text-base border"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {url.provider}
                                        </Link>
                                    ))}
                                </div>
                            </Fragment>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

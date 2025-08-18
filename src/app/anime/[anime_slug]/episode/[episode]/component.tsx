"use client";

import Link from "next/link";
import { Fragment } from "react";

const columns = ["mp4", "mkv"];

export default function AnimeStreamingComponent({ data }) {
    return (
        <div className="pb-20 pt-28 px-4 md:px-16 min-h-svh w-full">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
                {data.episode}
            </h1>
            <div className="flex flex-col xl:flex-row justify-between gap-10">
                <div className="space-y-4">
                    <iframe
                        src={data.stream_url}
                        className="w-full aspect-video rounded-md xl:w-[1180px] xl:h-[600px]"
                        allowFullScreen
                    />
                    <div className="flex gap-4 justify-between xl:justify-end">
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

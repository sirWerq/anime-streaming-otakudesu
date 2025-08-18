import { CardAnimeHome } from "@/models/global";
import Image from "next/image";
import Link from "next/link";

export default function Card({ data }: { data: CardAnimeHome }) {
    return (
        <Link
            href={`/anime/${data.slug}`}
            key={data.slug}
            className="relative flex-shrink-0 w-64 h-96 rounded overflow-hidden"
        >
            <Image
                src={data.poster}
                alt={data.title}
                width={256}
                height={384}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 hover:from-black/40 transition-all duration-300 to-transparent p-2 text-white flex flex-col justify-between">
                <div className="flex justify-between">
                    {data.rating && (
                        <div className="flex items-center gap-1 bg-primary rounded-2xl px-2 py-1 text-xs text-black">
                            <Image
                                src="/star.svg"
                                alt="rating icon"
                                width={12}
                                height={12}
                            />
                            <p>{data.rating}</p>
                        </div>
                    )}
                    {data.current_episode || data.episode_count ? (
                        <div className="flex items-center justify-center bg-primary rounded-2xl px-2 py-1 text-sm">
                            <p className="text-black">
                                {data.current_episode
                                    ? data.current_episode
                                    : data.episode_count
                                    ? `Episode: ${data.episode_count}`
                                    : null}
                            </p>
                        </div>
                    ) : null}
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-lg line-clamp-2">
                        {data.title}
                    </p>
                    {data.release_date || data.release_day ? (
                        <p className="text-sm font-medium">
                            {data.release_day
                                ? `Dirilis: ${data.release_day}`
                                : data.last_release_date
                                ? `Terakhir dirilis: ${data.last_release_date}`
                                : null}
                        </p>
                    ) : null}
                </div>
            </div>
        </Link>
    );
}

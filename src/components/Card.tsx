import { CardAnimeHome } from "@/models/global";
import Image from "next/image";
import Link from "next/link";

export default function Card({
    data,
    customStyle,
    isPriority = false,
}: {
    data: CardAnimeHome;
    customStyle?: string | null;
    isPriority?: boolean;
}) {
    return (
        <Link
            href={`/anime/${data.slug}`}
            key={data.slug}
            className={`group relative flex-shrink-0 rounded-md overflow-hidden ${customStyle}`}
        >
            <Image
                src={data.poster}
                alt={data.title}
                width={256}
                height={384}
                priority={isPriority}
                className="w-full h-auto object-cover aspect-[2/3] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 group-hover:from-black/60 to-transparent p-2 md:p-3 text-white flex flex-col justify-between transition-all duration-300">
                <div className="flex justify-between items-start gap-1">
                    {data.rating && (
                        <div className="flex items-center gap-1 bg-primary rounded-full px-2 py-1 text-[10px] sm:text-xs text-black font-semibold">
                            <Image
                                src="/star.svg"
                                alt="rating icon"
                                width={12}
                                height={12}
                            />
                            <p>{data.rating}</p>
                        </div>
                    )}
                    <div className="flex items-center flex-shrink-0 gap-1">
                        {data.status && (
                            <div
                                className={`flex items-center justify-center ${
                                    data.status === "Ongoing"
                                        ? "bg-green-600"
                                        : "bg-blue-600"
                                } rounded-full px-2 py-1 text-[10px] sm:text-xs text-white font-semibold`}
                            >
                                <p>{data.status}</p>
                            </div>
                        )}
                        {data.current_episode || data.episode_count ? (
                            <div className="flex items-center justify-center bg-primary rounded-full px-2 py-1 text-[10px] sm:text-xs text-black font-semibold">
                                <p>
                                    {data.current_episode
                                        ? data.current_episode
                                        : data.episode_count
                                        ? `Eps: ${data.episode_count}`
                                        : null}
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="space-y-1">
                    {data.genres && data.genres.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1">
                            {data.genres.map((genre) => (
                                <span
                                    key={genre.slug}
                                    className="text-[10px] sm:text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}
                    <p className="font-semibold text-sm sm:text-base md:text-lg line-clamp-2">
                        {data.title}
                    </p>
                    {data.release_date || data.release_day ? (
                        <p className="text-xs sm:text-sm font-medium text-white/80">
                            {data.release_day
                                ? `Rilis: ${data.release_day}`
                                : data.last_release_date
                                ? `Update: ${data.last_release_date}`
                                : null}
                        </p>
                    ) : null}
                </div>
            </div>
        </Link>
    );
}

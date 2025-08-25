import { Genre } from "@/models/global";
import Image from "next/image";
import Link from "next/link";

export default async function GenresPage() {
    let datas;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/genres`
        );
        const responseJson = await response.json();
        datas = responseJson.data;
    } catch (err) {
        // redirect(`/not-found`);
        console.error("Error fetching genres:", err);
    }

    return (
        <div className="min-h-svh w-full px-4 pb-20 pt-28 md:px-16">
            <h1 className="mb-4 text-lg font-bold md:text-xl lg:text-2xl">
                Genres
            </h1>
            <div className="grid grid-cols-7 gap-4">
                {datas?.map((data: Genre) => (
                    <Link
                        key={data.slug}
                        href={`/anime/genre/${data.slug}`}
                        className="flex items-center justify-between rounded bg-secondary px-2"
                    >
                        <div className="flex items-center gap-2">
                            <Image
                                src={`/${data.slug}.png`}
                                alt={`${data.slug} icon`}
                                width={75}
                                height={75}
                            />
                            {data.name}
                        </div>
                        <Image
                            src="/arrow-right-circle.svg"
                            alt="open icon"
                            width={25}
                            height={25}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

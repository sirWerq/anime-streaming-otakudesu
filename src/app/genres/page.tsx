import { Genre } from "@/models/global";
import { checkString } from "@/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Daftar Genre Anime",
    description: checkString(
        "Jelajahi berbagai genre anime di RifqiNime. Temukan koleksi anime berdasarkan genre favoritmu, mulai dari Aksi, Petualangan, hingga Sci-Fi."
    ),
};

export default async function GenresPage() {
    let datas;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/genres`
        );
        const responseJson = await response.json();
        datas = responseJson.data;
    } catch (err) {
        console.log(err);
        redirect(`/not-found`);
    }

    return (
        <div className="min-h-svh w-full px-4 pb-20 pt-28 md:px-16">
            <h1 className="mb-4 text-lg font-bold md:text-xl lg:text-2xl">
                Genres
            </h1>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                {datas?.map((data: Genre) => (
                    <Link
                        key={data.slug}
                        href={`/anime/genre/${data.slug}`}
                        className="flex items-center justify-between rounded bg-secondary p-2"
                    >
                        <div className="flex items-center gap-2">
                            <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                                <Image
                                    src={`/${data.slug}.svg`}
                                    alt={`${data.slug} icon`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-sm font-medium sm:text-base">
                                {data.name}
                            </span>
                        </div>
                        <div className="relative h-6 w-6">
                            <Image
                                src="/arrow-right-circle.svg"
                                alt="open icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

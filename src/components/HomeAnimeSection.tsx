"use client";

import { CardAnimeHome } from "@/models/global";
import { Card } from ".";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HomeAnimeSection({
    data,
    title,
}: {
    title: string;
    data: CardAnimeHome[];
}) {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentRef = scrollContainerRef.current;
        if (!currentRef) return;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            currentRef.scrollLeft += event.deltaY;
        };

        currentRef.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            currentRef.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <div className="pt-10 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{title}</h2>
                <Link
                    href={`/${title.toLowerCase().replace(" ", "-")}`}
                    className="bg-tertiary rounded px-4 py-1 text-sm"
                >
                    Lihat Selengkapnya
                </Link>
            </div>
            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto no-scrollbar"
            >
                {data.map((anime) => (
                    <Card data={anime} key={anime.slug} />
                ))}
            </div>
        </div>
    );
}

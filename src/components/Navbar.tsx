"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-secondary flex justify-between items-center px-4 md:px-16 py-3 fixed z-50 w-full shadow-md">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/profile.svg"
                    alt="profile icon"
                    width={50}
                    height={50}
                    className="w-10 h-10 md:w-12 md:h-12"
                />
                <p className="text-xl font-bold text-quaternary">
                    Rifqi<span className="text-black">Nime</span>
                </p>
            </Link>
            <button
                onClick={toggleMenu}
                className="md:hidden text-black focus:outline-none"
            >
                <Image
                    src="/menu.svg"
                    alt="menu icon"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                />
            </button>
            <div
                className={`md:flex items-center w-full md:w-auto absolute md:static top-full left-0 bg-secondary transition-all duration-300 ease-in-out z-40 ${
                    isOpen ? "block" : "hidden"
                }`}
            >
                <ul className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-0">
                    <li>
                        <Link
                            href="/"
                            className="hover:underline"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/ongoing-anime"
                            className="hover:underline"
                            onClick={toggleMenu}
                        >
                            Ongoing
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/completed-anime"
                            className="hover:underline"
                            onClick={toggleMenu}
                        >
                            Completed
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/genres"
                            className="hover:underline"
                            onClick={toggleMenu}
                        >
                            Genres
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

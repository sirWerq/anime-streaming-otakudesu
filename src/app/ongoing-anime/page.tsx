import Image from "next/image";

export default function OngoingAnimePage() {
    return (
        <div className="pb-20 pt-28 px-4 lg:px-16 min-h-svh w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center lg:text-left">
                    On<span className="text-quaternary">Going</span> Anime
                </h1>
                <form action="" className="relative w-full md:w-auto">
                    <input
                        type="text"
                        className="bg-tertiary focus:outline-none w-full md:w-[410px] h-11 px-2 rounded"
                        placeholder="Search..."
                    />
                    <Image
                        src="/search.svg"
                        alt="search icon"
                        height={25}
                        width={25}
                        className="absolute top-1/2 -translate-y-1/2 right-4 h-[25px] w-[25px]"
                    />
                </form>
            </div>
            <div className="flex"></div>
        </div>
    );
}

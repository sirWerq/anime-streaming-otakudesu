import { Metadata } from "next";
import SearchComponent from "./component";
import { checkString } from "@/utils";

export const metadata: Metadata = {
    title: "Pencarian Anime",
    description: checkString(
        "Cari anime favoritmu di RifqiNime. Temukan ribuan judul anime dari berbagai genre dengan mudah dan cepat."
    ),
};

export default function SearchPage() {
    return <SearchComponent />;
}

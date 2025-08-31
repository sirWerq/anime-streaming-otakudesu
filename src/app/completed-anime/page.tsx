import { Metadata } from "next";
import CompletedAnimeComponent from "./component";
import { checkString } from "@/utils";

export const metadata: Metadata = {
    title: "Anime Tamat (Completed)",
    description: checkString(
        "Temukan koleksi lengkap anime yang sudah tamat di RifqiNime. Nikmati seluruh episode tanpa harus menunggu dan binge-watching serial favoritmu sekarang juga!"
    ),
};

export default function CompletedAnimePage() {
    return <CompletedAnimeComponent />;
}

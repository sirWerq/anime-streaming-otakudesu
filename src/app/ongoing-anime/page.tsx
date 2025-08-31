import { Metadata } from "next";
import OngoingAnimeComponent from "./component";
import { checkString } from "@/utils";

export const metadata: Metadata = {
    title: "Anime On-going",
    description: checkString(
        "Ikuti terus episode terbaru dari anime yang sedang tayang (on-going) di RifqiNime. Jangan sampai ketinggalan setiap pembaruan episode!"
    ),
};

export default function OngoingAnimePage() {
    return <OngoingAnimeComponent />;
}

import { redirect } from "next/navigation";
import HomeComponent from "./component";

export default async function Home() {
    let datas;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_BE}/v1/home`
        );
        const responseJson = await response.json();
        datas = responseJson.data;
    } catch (err) {
        console.log(err);
        redirect(`/not-found`);
    }

    return <HomeComponent datas={datas} />;
}

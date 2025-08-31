import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import { checkString } from "@/utils";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "600", "500", "700", "800"],
});

export const metadata: Metadata = {
    title: {
        default: "RifqiNime",
        template: "%s - RifqiNime",
    },
    description: checkString(
        "RifqiNime adalah destinasi utama untuk para penggemar anime! Temukan, tonton, dan nikmati ribuan judul anime terbaru dan terlengkap dalam kualitas terbaik, langsung dari PC atau ponselmu."
    ),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.className} antialiased min-h-svh w-full`}
            >
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-4 md:px-16 py-12 bg-secondary flex flex-col md:flex-row justify-between gap-8 md:gap-16">
            <div className="md:w-2/3">
                <h2 className="font-semibold text-xl">Disclaimer</h2>
                <p>
                    Situs web ini dibuat untuk tujuan pembelajaran dan edukasi
                    tentang pengembangan web. Seluruh konten anime yang tersedia
                    merupakan hasil dari scraping dan tidak disimpan di server
                    kami. Kami sangat menganjurkan Anda untuk mendukung kreator
                    anime dengan menonton di platform resmi.
                </p>
            </div>
            <div className="flex-1 space-y-2">
                <h2 className="font-semibold text-xl">Contact Us</h2>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    <Link
                        href="https://www.instagram.com/rfqiags"
                        target="_blank"
                        className="flex items-center justify-start gap-2"
                    >
                        <Image
                            src="/instagram.svg"
                            alt="instagram icon"
                            width={32}
                            height={32}
                        />
                        <p>rfqiags</p>
                    </Link>
                    <Link
                        href="https://github.com/sirWerq"
                        target="_blank"
                        className="flex items-center justify-start gap-2"
                    >
                        <Image
                            src="/github.svg"
                            alt="github icon"
                            width={32}
                            height={32}
                        />
                        <p>sirWerq</p>
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/rifqi-alisba-garwita-sutrisno-612852241"
                        target="_blank"
                        className="flex items-center justify-start gap-2"
                    >
                        <Image
                            src="/linkedin.svg"
                            alt="linkedin icon"
                            width={32}
                            height={32}
                        />
                        <p>Rifqi Alisba Garwita Sutrisno</p>
                    </Link>
                </div>
            </div>
        </footer>
    );
}

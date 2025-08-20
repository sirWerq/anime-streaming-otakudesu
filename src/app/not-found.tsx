import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-primary p-4">
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-8xl font-bold text-quaternary md:text-9xl">
                    404
                </h1>
                <h2 className="mt-4 text-2xl font-semibold text-foreground md:text-3xl">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="mt-2 max-w-md text-foreground/70">
                    Maaf, halaman yang Anda cari tidak ada atau mungkin telah
                    dipindahkan.
                </p>
                <Link
                    href="/"
                    className="mt-8 rounded-md bg-secondary px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-tertiary"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </main>
    );
}

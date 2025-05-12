import Footer from "@/components/Footer";
import Header from "@/components/shared/header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Home',
    description: "Modern E-commerce store",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <main className="flex-1 wrapper">{children}</main>
            <Footer />
        </div>
    );
}

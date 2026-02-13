import { ScrollToTop } from "@/components/articles";

export default function ArticlesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <ScrollToTop />
        </>
    );
}

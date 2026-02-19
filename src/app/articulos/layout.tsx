import { ScrollToTop } from "@/components/ui";

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

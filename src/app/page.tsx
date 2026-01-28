import { APP_METADATA } from "@/core/constants/app-constants";

export default function Home() {
    return (
        <div>
            <h1 className="text-6xl font-bold">{APP_METADATA.title}</h1>
        </div>
    );
}

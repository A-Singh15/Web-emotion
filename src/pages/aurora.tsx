import DefaultLayout from "@/layouts/default";

export default function AppWithoutJetson() {
    return (
        <DefaultLayout>
            <div className="fixed top-20 left-0 w-full h-[calc(100vh-80px)] z-0">
                <iframe
                    src="https://aurora-plus-ai.vercel.app/"
                    title="Aurora Plus AI App"
                    className="w-full h-full border-none"
                />
            </div>
        </DefaultLayout>
    );
}

import DefaultLayout from "@/layouts/default";

export default function AppWithoutJetson() {
  return (
    <DefaultLayout>
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <iframe
          src="https://aurora-plus-ai.vercel.app/"
          title="Aurora Plus AI App"
          className="w-full h-full border-none"
        />
      </div>
    </DefaultLayout>
  );
}

import Feed from "@/components/organisms/Feed";
import Header from "@/components/organisms/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="mx-auto max-w-5xl mt-10">
        <Feed />
      </div>
    </main>
  );
}

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function GuidePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-6">취업가이드</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        이력서 작성법, 면접 준비 등 실전 취업 가이드를 준비 중입니다.
                    </p>
                    <div className="p-12 border-2 border-dashed rounded-lg bg-muted/30">
                        <p className="text-lg text-muted-foreground">
                            🚧 곧 오픈 예정입니다 🚧
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

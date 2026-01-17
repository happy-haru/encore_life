import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        지금 바로 시작하세요
                    </h2>
                    <p className="text-lg md:text-xl mb-8 text-white/90">
                        수천 명의 중장년층이 Encore Life를 통해
                        <br />
                        새로운 커리어를 시작했습니다
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto"
                            asChild
                        >
                            <Link href="/jobs">
                                채용공고 둘러보기
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto"
                            asChild
                        >
                            <Link href="/community">커뮤니티 참여하기</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

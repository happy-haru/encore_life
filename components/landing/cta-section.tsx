import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
    return (
        <section className="relative py-24 bg-primary overflow-hidden">
            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-10 pattern-grid-lg" />

            {/* 장식용 원 */}
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        당신의 경험이 <br className="md:hidden" />
                        <span className="text-blue-200">새로운 기회</span>가 됩니다
                    </h2>
                    <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        이미 수천 명의 중장년층이 Encore Life와 함께
                        <br className="hidden md:block" />
                        멋진 제2의 인생을 시작했습니다.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Button
                            size="lg"
                            className="bg-white text-primary hover:bg-blue-50 text-lg px-10 py-7 h-auto rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
                            asChild
                        >
                            <Link href="/jobs">
                                <span className="font-bold">지금 바로 시작하기</span>
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-10 py-7 h-auto rounded-full"
                            asChild
                        >
                            <Link href="/community">
                                커뮤니티 둘러보기
                            </Link>
                        </Button>
                    </div>

                    <p className="mt-8 text-blue-200 text-sm">
                        * 회원가입 없이도 채용공고를 둘러볼 수 있습니다
                    </p>
                </div>
            </div>
        </section>
    );
}

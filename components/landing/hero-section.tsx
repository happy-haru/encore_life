import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

interface HeroSectionProps {
    stats: {
        verifiedJobs: number;
        successfulReentries: number;
        totalMembers: number;
    };
}

export function HeroSection({ stats }: HeroSectionProps) {
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('ko-KR').format(num);
    };

    return (
        <section className="relative overflow-hidden bg-white/50 py-24 md:py-36">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    {/* 메인 헤드라인 */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-primary to-slate-800 bg-clip-text text-transparent leading-tight tracking-tight">
                        경험이 빛나는 <br className="hidden md:block" />
                        <span className="text-primary">새로운 시작</span>을 응원합니다
                    </h1>

                    {/* 서브 헤드라인 */}
                    <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
                        4060 중장년층을 위한 맞춤형 재취업 플랫폼
                        <br />
                        당신의 소중한 경력, <strong>Encore Life</strong>에서 다시 펼쳐보세요.
                    </p>

                    {/* CTA 버튼 */}
                    <div className="flex flex-col sm:flex-row gap-5 mb-16 w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-7 h-auto rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                            asChild
                        >
                            <Link href="/jobs">
                                채용공고 보러가기
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 text-lg px-10 py-7 h-auto rounded-full"
                            asChild
                        >
                            <Link href="/guide">이용 가이드</Link>
                        </Button>
                    </div>

                    {/* 주요 통계 (누적 회원수) */}
                    <div className="flex justify-center w-full max-w-4xl">
                        <div className="flex flex-col items-center p-8 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all min-w-[280px]">
                            <div className="p-3 bg-orange-100 rounded-full mb-4">
                                <BookOpen className="h-6 w-6 text-orange-600" />
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">
                                {formatNumber(stats.totalMembers)}+
                            </div>
                            <div className="text-base text-slate-500 font-medium">누적 회원수</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 배경 장식 (오로라 효과 강화) */}
            <div className="absolute top-0 -left-20 -z-10 opacity-30 animate-pulse-slow">
                <div className="h-[500px] w-[500px] rounded-full bg-blue-200 blur-[100px]" />
            </div>
            <div className="absolute top-40 right-0 -z-10 opacity-30 animate-pulse-slow delay-1000">
                <div className="h-[600px] w-[600px] rounded-full bg-indigo-100 blur-[120px]" />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -z-10 opacity-40">
                <div className="h-[400px] w-[800px] rounded-full bg-gradient-to-t from-white via-transparent to-transparent blur-3xl" />
            </div>
        </section>
    );
}

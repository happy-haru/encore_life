import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, BookOpen } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* 메인 헤드라인 */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        경험이 빛나는 새로운 시작
                    </h1>

                    {/* 서브 헤드라인 */}
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                        40-65세+ 중장년층을 위한 맞춤 재취업 플랫폼
                        <br />
                        <span className="text-secondary font-semibold">
                            당신의 경력과 전문성을 인정받으세요
                        </span>
                    </p>

                    {/* CTA 버튼 */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <Button
                            size="lg"
                            className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 py-6 h-auto"
                            asChild
                        >
                            <Link href="/jobs">
                                채용공고 보기
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-6 h-auto"
                            asChild
                        >
                            <Link href="/guide">취업가이드</Link>
                        </Button>
                    </div>

                    {/* 주요 통계 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
                        <div className="flex flex-col items-center p-6 bg-background/80 backdrop-blur rounded-lg border">
                            <Briefcase className="h-8 w-8 text-secondary mb-2" />
                            <div className="text-3xl font-bold text-primary mb-1">0</div>
                            <div className="text-sm text-muted-foreground">재취업 성공</div>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-background/80 backdrop-blur rounded-lg border">
                            <Users className="h-8 w-8 text-accent mb-2" />
                            <div className="text-3xl font-bold text-primary mb-1">0</div>
                            <div className="text-sm text-muted-foreground">등록 기업</div>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-background/80 backdrop-blur rounded-lg border">
                            <BookOpen className="h-8 w-8 text-primary mb-2" />
                            <div className="text-3xl font-bold text-primary mb-1">0</div>
                            <div className="text-sm text-muted-foreground">커뮤니티 회원</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 -z-10 opacity-20">
                <div className="h-96 w-96 rounded-full bg-secondary blur-3xl" />
            </div>
            <div className="absolute bottom-0 left-0 -z-10 opacity-20">
                <div className="h-96 w-96 rounded-full bg-accent blur-3xl" />
            </div>
        </section>
    );
}

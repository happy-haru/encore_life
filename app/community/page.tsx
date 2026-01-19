"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Briefcase,
    MessageSquareQuote,
    GraduationCap,
    MapPin,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const categories = [
    {
        id: "free-board",
        title: "자유게시판",
        description: "서로의 안부를 묻고 자유롭게 소통하는 공간",
        icon: MessageSquareQuote,
        tags: ["소통", "질문답변", "동기부여", "사는이야기"],
        color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
    },
    {
        id: "job-info",
        title: "취업정보",
        description: "면접 후기, 채용 정보, 직종별 정보를 공유해요",
        icon: Briefcase,
        tags: ["면접후기", "채용정보", "직무정보", "업계동향"],
        color: "text-green-600 bg-green-100 dark:bg-green-900/20"
    },
    {
        id: "education",
        title: "교육·자격증",
        description: "국비지원 교육, 자격증 정보, 무료 강의를 알아봐요",
        icon: GraduationCap,
        tags: ["국비지원", "자격증", "온라인교육", "정부지원"],
        color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
    },
    {
        id: "regional",
        title: "지역 모임",
        description: "지역별 오프라인 모임, 채용박람회, 네트워킹을 만들어요",
        icon: MapPin,
        tags: ["우리동네", "오프라인", "네트워킹", "채용박람회"],
        color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20"
    }
];

export default function CommunityPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">커뮤니티</h1>
                    <p className="text-xl text-muted-foreground">
                        함께 나누는 경험, 함께 여는 기회
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {categories.map((category) => (
                        <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 border-muted/60 relative">
                            <CardHeader>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${category.color}`}>
                                        <category.icon className="w-6 h-6" />
                                    </div>
                                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                                    </Button>
                                </div>
                                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                                    {category.title}
                                </CardTitle>
                                <CardDescription className="text-base line-clamp-2">
                                    {category.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {category.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="font-normal text-muted-foreground bg-secondary/50">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <Link href={`/community/${category.id}`} className="absolute inset-0">
                                <span className="sr-only">{category.title} 바로가기</span>
                            </Link>
                        </Card>
                    ))}
                </div>

                <div className="mt-20 text-center bg-muted/30 rounded-2xl p-12 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">함께 만들어가는 앙코르 라이프</h2>
                    <p className="text-muted-foreground mb-8">
                        당신의 소중한 경험과 지혜를 나눠주세요.<br />
                        서로의 새로운 시작을 응원하는 따뜻한 공간이 되길 바랍니다.
                    </p>
                    <Button size="lg" className="rounded-full px-8" asChild>
                        <Link href="/community/write">
                            첫 글 쓰러 가기
                        </Link>
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Trophy,
    Briefcase,
    MessageSquareQuote,
    UserPlus,
    GraduationCap,
    HelpCircle,
    MapPin,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const categories = [
    {
        id: "success-stories",
        title: "재취업 성공 스토리",
        description: "실제 재취업 성공 사례 인터뷰와 동기부여 콘텐츠",
        icon: Trophy,
        tags: ["성공사례", "인터뷰", "동기부여"],
        color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
        id: "job-groups",
        title: "직종별 모임",
        description: "영업/마케팅, IT, 경리/회계 등 분야별 정보 공유",
        icon: Briefcase,
        tags: ["직무토크", "업계동향", "정보공유"],
        color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
    },
    {
        id: "interview-reviews",
        title: "면접 후기 게시판",
        description: "기업별 면접 질문 및 분위기, 합격/불합격 피드백",
        icon: MessageSquareQuote,
        tags: ["면접기출", "후기공유", "팁"],
        color: "text-green-600 bg-green-100 dark:bg-green-900/20"
    },
    {
        id: "mentoring",
        title: "멘토링 매칭",
        description: "재취업 성공자와 구직자 1:1 연결 및 상담",
        icon: UserPlus,
        tags: ["1:1상담", "커피챗", "경력전환"],
        color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20"
    },
    {
        id: "education",
        title: "자격증/교육 정보",
        description: "중장년 우대 자격증 및 정부 지원 무료 교육 정보",
        icon: GraduationCap,
        tags: ["교육정보", "자격증", "국비지원"],
        color: "text-red-600 bg-red-100 dark:bg-red-900/20"
    },
    {
        id: "qna",
        title: "Q&A 게시판",
        description: "이력서 첨삭, 연봉 협상 등 궁금한 점 질문하기",
        icon: HelpCircle,
        tags: ["질문답변", "고민상담", "법률노무"],
        color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
    },
    {
        id: "regional",
        title: "지역별 모임",
        description: "오프라인 네트워킹 및 지역 채용 정보 공유",
        icon: MapPin,
        tags: ["우리동네", "오프라인", "채용박람회"],
        color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/20"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {categories.map((category) => (
                        <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 border-muted/60">
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
                    <Button size="lg" className="rounded-full px-8">
                        첫 글 쓰러 가기
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

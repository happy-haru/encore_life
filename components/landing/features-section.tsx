import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Users, BookOpen, Heart, TrendingUp, Award } from "lucide-react";

const features = [
    {
        icon: Briefcase,
        title: "맞춤 채용공고",
        description: "중장년층에게 적합한 채용공고만 선별하여 제공합니다. 나이 차별 없는 공정한 채용 기회를 만나보세요.",
        color: "text-secondary",
    },
    {
        icon: Users,
        title: "활발한 커뮤니티",
        description: "재취업 경험담, 고민 상담, 성공 후기를 나누세요. 같은 고민을 하는 동료들과 함께하면 더 큰 힘이 됩니다.",
        color: "text-accent",
    },
    {
        icon: BookOpen,
        title: "취업가이드",
        description: "이력서 작성법부터 면접 준비까지, 전문가의 실전 노하우를 무료로 제공합니다.",
        color: "text-primary",
    },
    {
        icon: Heart,
        title: "1:1 경력 컨설팅",
        description: "전문 컨설턴트가 당신의 경력을 분석하고 최적의 재취업 전략을 제시합니다.",
        color: "text-secondary",
    },
    {
        icon: TrendingUp,
        title: "AI 직무 매칭",
        description: "당신의 경력과 기술을 분석하여 가장 적합한 채용공고를 자동으로 추천합니다.",
        color: "text-accent",
    },
    {
        icon: Award,
        title: "정부정책 안내",
        description: "중장년층을 위한 정부 지원 정책과 교육 프로그램 정보를 한눈에 확인하세요.",
        color: "text-primary",
    },
];

export function FeaturesSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                {/* 섹션 헤더 */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        시니어잡이 <span className="text-secondary">특별한 이유</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        중장년층의 성공적인 재취업을 위한 모든 것이 준비되어 있습니다
                    </p>
                </div>

                {/* 기능 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card
                                key={index}
                                className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                            >
                                <CardContent className="p-6">
                                    <Icon className={`h-12 w-12 ${feature.color} mb-4`} />
                                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

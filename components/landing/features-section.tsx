import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Users, BookOpen, Heart, TrendingUp, Award } from "lucide-react";

const features = [
    {
        icon: Briefcase,
        title: "맞춤 채용공고",
        description: "중장년층에게 적합한 채용공고만 선별하여 제공합니다. 나이 차별 없는 공정한 채용 기회를 만나보세요.",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        icon: Users,
        title: "활발한 커뮤니티",
        description: "재취업 경험담, 고민 상담, 성공 후기를 나누세요. 같은 고민을 하는 동료들과 함께하면 더 큰 힘이 됩니다.",
        color: "text-green-600",
        bg: "bg-green-50"
    },
    {
        icon: BookOpen,
        title: "취업가이드",
        description: "이력서 작성법부터 면접 준비까지, 전문가의 실전 노하우를 무료로 제공합니다.",
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
    {
        icon: Heart,
        title: "1:1 경력 컨설팅",
        description: "전문 컨설턴트가 당신의 경력을 분석하고 최적의 재취업 전략을 제시합니다.",
        color: "text-red-500",
        bg: "bg-red-50"
    },
    {
        icon: TrendingUp,
        title: "AI 직무 매칭",
        description: "당신의 경력과 기술을 분석하여 가장 적합한 채용공고를 자동으로 추천합니다.",
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        icon: Award,
        title: "정부정책 안내",
        description: "중장년층을 위한 정부 지원 정책과 교육 프로그램 정보를 한눈에 확인하세요.",
        color: "text-teal-600",
        bg: "bg-teal-50"
    },
];

export function FeaturesSection() {
    return (
        <section className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-4">
                {/* 섹션 헤더 */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                        Encore Life가 <span className="text-primary">특별한 이유</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        성공적인 재취업을 위한 모든 서비스가 준비되어 있습니다
                    </p>
                </div>

                {/* 기능 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card
                                key={index}
                                className="border border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                            >
                                <CardContent className="p-8">
                                    <div className={`h-14 w-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`h-7 w-7 ${feature.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">
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

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getInAppBrowserType, openInExternalBrowser, type InAppBrowserType } from "@/lib/utils/browser-detect";
import { AlertCircle, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InAppBrowserWarning() {
    const [browserType, setBrowserType] = useState<InAppBrowserType>('none');
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        setBrowserType(getInAppBrowserType());
    }, []);

    if (browserType === 'none') return null;

    const handleKakaoLogin = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "kakao",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                console.error("Error logging in with Kakao:", error.message);
                alert("카카오 로그인 중 오류가 발생했습니다.");
                setIsLoading(false);
            }
            // 성공 시 리다이렉트되므로 로딩 상태 유지
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
        }
    };

    // 카카오톡 인앱 브라우저 전용 메시지
    if (browserType === 'kakao') {
        return (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-8 space-y-6 animate-in zoom-in-95 duration-200">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <AlertCircle className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-slate-900 mb-2">
                                구글 로그인을 원하시나요?
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                카카오톡 인앱 브라우저에서는 <strong className="text-blue-600">카카오 로그인만</strong> 사용 가능합니다.
                            </p>
                        </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4 space-y-2 border border-emerald-200">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            <p className="font-semibold text-emerald-900">카카오 로그인 사용 가능</p>
                        </div>
                        <p className="text-sm text-emerald-700 ml-7">
                            현재 브라우저에서 바로 카카오 로그인을 사용할 수 있습니다.
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                        <p className="font-semibold text-slate-900">💡 구글 로그인을 원한다면?</p>
                        <p className="text-sm text-slate-600">
                            외부 브라우저(Safari, Chrome)에서 열면 구글 로그인도 사용할 수 있습니다.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={openInExternalBrowser}
                            size="lg"
                            variant="outline"
                            className="w-full rounded-full text-base py-6 border-2"
                        >
                            <ExternalLink className="mr-2 h-5 w-5" />
                            외부 브라우저로 열기
                        </Button>
                        <Button
                            onClick={handleKakaoLogin}
                            disabled={isLoading}
                            size="lg"
                            className="w-full rounded-full text-base py-6 bg-yellow-400 hover:bg-yellow-500 text-black"
                        >
                            {isLoading ? "로그인 중..." : "카카오로 로그인하기"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // 기타 인앱 브라우저 메시지 (모든 소셜 로그인 제한)
    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 space-y-6 animate-in zoom-in-95 duration-200">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                        <AlertCircle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">
                            외부 브라우저로 열어주세요
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            현재 브라우저에서는 <strong>카카오 및 구글 로그인이 제한</strong>됩니다.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-slate-900">📱 모바일 사용자</p>
                    <ol className="text-sm text-slate-600 space-y-1 ml-4 list-decimal">
                        <li>우측 상단 <strong>"더보기 ⋮"</strong> 메뉴 클릭</li>
                        <li><strong>"Safari에서 열기"</strong> 또는 <strong>"Chrome에서 열기"</strong> 선택</li>
                    </ol>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={openInExternalBrowser}
                        size="lg"
                        className="w-full rounded-full text-lg py-6"
                    >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        외부 브라우저로 열기
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setBrowserType('none')}
                        className="w-full"
                    >
                        이미 외부 브라우저입니다
                    </Button>
                </div>
            </div>
        </div>
    );
}

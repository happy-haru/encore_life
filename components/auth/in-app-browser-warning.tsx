"use client";

import { useState, useEffect } from "react";
import { isInAppBrowser, openInExternalBrowser } from "@/lib/utils/browser-detect";
import { AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InAppBrowserWarning() {
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        setShowWarning(isInAppBrowser());
    }, []);

    if (!showWarning) return null;

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
                            카카오톡, 페이스북 등의 앱 내 브라우저에서는 Google 로그인이 제한됩니다.
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
                        onClick={() => setShowWarning(false)}
                        className="w-full"
                    >
                        이미 외부 브라우저입니다
                    </Button>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="flex justify-center">
                    <div className="p-4 bg-red-100 rounded-full">
                        <AlertTriangle className="h-16 w-16 text-red-600" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-slate-900">
                        문제가 발생했습니다
                    </h1>
                    <p className="text-lg text-slate-600">
                        요청하신 작업을 처리하는 중 오류가 발생했습니다.
                    </p>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="text-left p-4 bg-red-50 rounded-lg text-sm text-red-800 overflow-auto max-h-40">
                        <pre className="whitespace-pre-wrap">{error.message}</pre>
                    </div>
                )}

                <div className="flex gap-4 justify-center">
                    <Button onClick={() => reset()} size="lg" className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        다시 시도
                    </Button>
                    <Button
                        onClick={() => (window.location.href = '/')}
                        variant="outline"
                        size="lg"
                        className="gap-2"
                    >
                        <Home className="h-4 w-4" />
                        홈으로
                    </Button>
                </div>
            </div>
        </div>
    );
}

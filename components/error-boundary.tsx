'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
                    <div className="text-center space-y-6 max-w-md">
                        <div className="flex justify-center">
                            <div className="p-4 bg-red-100 rounded-full">
                                <AlertTriangle className="h-12 w-12 text-red-600" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-slate-900">
                                앗! 문제가 발생했습니다
                            </h2>
                            <p className="text-slate-600">
                                페이지를 불러오는 중 오류가 발생했습니다.
                                <br />
                                잠시 후 다시 시도해주세요.
                            </p>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="text-left p-4 bg-red-50 rounded-lg text-sm text-red-800 overflow-auto max-h-40">
                                <pre>{this.state.error.message}</pre>
                            </div>
                        )}

                        <Button
                            onClick={() => window.location.reload()}
                            size="lg"
                            className="gap-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            새로고침
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

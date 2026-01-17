"use client";

import Link from "next/link";
import { NAVIGATION_ITEMS, APP_NAME } from "@/lib/constants";
import { UserMenu } from "@/components/auth/user-menu";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* 로고 */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                Encore
                            </span>
                            <span className="text-sm font-semibold text-muted-foreground tracking-wider">
                                LIFE
                            </span>
                        </div>
                    </div>
                </Link>

                {/* 데스크톱 네비게이션 */}
                <nav className="hidden md:flex items-center space-x-6">
                    {NAVIGATION_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* 우측 버튼 섹션 */}
                <div className="flex items-center gap-4">
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}

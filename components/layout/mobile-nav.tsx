"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* 햄버거 메뉴 버튼 - 모바일에서만 표시 */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
                aria-label="메뉴 열기"
            >
                <Menu className="h-6 w-6" />
            </Button>

            {/* 오버레이 배경 */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            {/* 사이드 드로어 메뉴 */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-72 bg-background shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary/5 to-accent/5">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-foreground">메뉴</h2>
                            <p className="text-xs text-muted-foreground mt-1">Encore Life</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={closeMenu}
                            aria-label="메뉴 닫기"
                            className="rounded-full hover:bg-accent"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* 네비게이션 링크 */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="space-y-1 px-3">
                            {NAVIGATION_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="flex items-center justify-between px-4 py-3.5 text-base font-medium text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 group"
                                    >
                                        <span>{item.label}</span>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* 푸터 */}
                    <div className="p-6 border-t bg-muted/30">
                        <p className="text-xs text-muted-foreground text-center">
                            경험이 빛나는 새로운 시작
                        </p>
                        <p className="text-xs text-muted-foreground text-center mt-1 font-semibold">
                            © 2024 Encore Life
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

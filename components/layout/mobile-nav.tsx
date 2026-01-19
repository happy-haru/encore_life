"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
                    className="fixed inset-0 z-50 bg-black/50 md:hidden"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            {/* 사이드 드로어 메뉴 */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold">메뉴</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={closeMenu}
                            aria-label="메뉴 닫기"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* 네비게이션 링크 */}
                    <nav className="flex-1 overflow-y-auto">
                        <ul className="py-4">
                            {NAVIGATION_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="block px-6 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* 푸터 (선택사항) */}
                    <div className="p-4 border-t">
                        <p className="text-xs text-muted-foreground text-center">
                            Encore Life
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

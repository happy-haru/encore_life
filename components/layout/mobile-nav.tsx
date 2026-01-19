"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useMenu } from "@/context/menu-context";

export function MobileNav() {
    const { isMenuOpen, openMenu, closeMenu } = useMenu();
    const isOpen = isMenuOpen("mobile");

    const toggleMenu = () => {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu("mobile");
        }
    };

    const handleCloseMenu = () => {
        closeMenu();
    };

    // ESC 키로 메뉴 닫기
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                handleCloseMenu();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    // 메뉴가 열릴 때 body 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

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
                    onClick={handleCloseMenu}
                    aria-hidden="true"
                />
            )}

            {/* 사이드 드로어 메뉴 */}
            <div
                className={`fixed top-0 right-0 z-50 h-[100dvh] w-72 bg-white border-l border-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.1)] transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full bg-white">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-slate-900">메뉴</h2>
                            <p className="text-xs text-slate-500 mt-1">Encore Life</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCloseMenu}
                            aria-label="메뉴 닫기"
                            className="rounded-full hover:bg-slate-100"
                        >
                            <X className="h-5 w-5 text-slate-700" />
                        </Button>
                    </div>

                    {/* 네비게이션 링크 */}
                    <nav className="flex-1 overflow-y-auto py-4 bg-white">
                        <ul className="space-y-1 px-3">
                            {NAVIGATION_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={handleCloseMenu}
                                        className="flex items-center justify-between px-4 py-4 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200 group border border-transparent hover:border-slate-100"
                                    >
                                        <span>{item.label}</span>
                                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* 푸터 */}
                    <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                        <p className="text-xs text-slate-500 text-center">
                            경험이 빛나는 새로운 시작
                        </p>
                        <p className="text-xs text-slate-400 text-center mt-1 font-semibold">
                            © 2024 Encore Life
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

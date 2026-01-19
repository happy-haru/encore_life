"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, LogOut, User, LogIn } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useMenu } from "@/context/menu-context";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MobileNav() {
    const { isMenuOpen, openMenu, closeMenu } = useMenu();
    const { user, signOut } = useAuth();
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

    const handleSignOut = async () => {
        await signOut();
        handleCloseMenu();
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
                onClick={(e) => {
                    e.stopPropagation();
                    if (isMenuOpen("mobile")) {
                        closeMenu();
                    } else {
                        openMenu("mobile");
                    }
                }}
                aria-label={isOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                aria-haspopup="menu"
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
                className={`fixed top-0 right-0 z-50 h-[100dvh] w-80 bg-white border-l border-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.1)] transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full bg-white">
                    {/* 헤더: 프로필 영역 */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-start justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900">메뉴</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCloseMenu}
                                aria-label="메뉴 닫기"
                                className="rounded-full hover:bg-slate-100 -mr-2 -mt-2"
                            >
                                <X className="h-5 w-5 text-slate-700" />
                            </Button>
                        </div>

                        {/* 사용자 프로필 또는 로그인 버튼 */}
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 border border-slate-200">
                                    <AvatarImage src={user.user_metadata?.avatar_url} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                        {user.email?.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="font-bold text-slate-900 truncate">
                                        {user.user_metadata?.full_name || user.email?.split("@")[0]}
                                    </span>
                                    <span className="text-xs text-slate-500 truncate">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <Button
                                asChild
                                className="w-full justify-center bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl shadow-sm"
                                onClick={handleCloseMenu}
                            >
                                <Link href="/auth/login" className="flex items-center gap-2">
                                    <LogIn className="h-5 w-5" />
                                    로그인 / 회원가입
                                </Link>
                            </Button>
                        )}
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

                        {/* 로그인한 경우 추가 메뉴 */}
                        {user && (
                            <div className="mt-4 px-3 pt-4 border-t border-slate-100">
                                <ul className="space-y-1">
                                    <li>
                                        <Link
                                            href="/profile"
                                            onClick={handleCloseMenu}
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                                        >
                                            <User className="h-4 w-4" />
                                            내 프로필
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            로그아웃
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
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

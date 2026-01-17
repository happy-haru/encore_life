import Link from "next/link";
import { APP_NAME, APP_SLOGAN, MAIN_NAV } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 브랜드 섹션 */}
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold mb-2">
                            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                {APP_NAME}
                            </span>
                        </h3>
                        <p className="text-muted-foreground mb-4">{APP_SLOGAN}</p>
                        <p className="text-sm text-muted-foreground">
                            40-65세+ 중장년층의 재취업을 지원하는 플랫폼입니다.
                            <br />
                            경험과 전문성을 인정받고 새로운 기회를 찾아보세요.
                        </p>
                    </div>

                    {/* 빠른 링크 */}
                    <div>
                        <h4 className="font-semibold mb-4">빠른 링크</h4>
                        <ul className="space-y-2">
                            {MAIN_NAV.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 고객 지원 */}
                    <div>
                        <h4 className="font-semibold mb-4">고객 지원</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    문의하기
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    자주 묻는 질문
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    이용약관
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    개인정보처리방침
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 하단 저작권 */}
                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>© 2026 {APP_NAME}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME, MAIN_NAV } from "@/lib/constants";

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
                    {MAIN_NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-base font-medium text-foreground/80 transition-colors hover:text-primary"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA 버튼 */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="hidden md:inline-flex">
                        로그인
                    </Button>
                    <Button className="bg-secondary hover:bg-secondary/90">
                        시작하기
                    </Button>
                </div>
            </div>
        </header>
    );
}

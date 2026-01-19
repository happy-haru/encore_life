"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

type MenuType = "user" | "mobile" | null;

interface MenuContextType {
    activeMenu: MenuType;
    openMenu: (menu: MenuType) => void;
    closeMenu: () => void;
    isMenuOpen: (menu: MenuType) => boolean;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
    // 명시적으로 null로 초기화 (닫힌 상태)
    const [activeMenu, setActiveMenu] = useState<MenuType>(null);

    // 마운트 시 메뉴가 닫힌 상태임을 보장
    useEffect(() => {
        setActiveMenu(null);
    }, []);

    const openMenu = useCallback((menu: MenuType) => {
        setActiveMenu(menu);
    }, []);

    const closeMenu = useCallback(() => {
        setActiveMenu(null);
    }, []);

    const isMenuOpen = useCallback((menu: MenuType) => {
        return activeMenu === menu;
    }, [activeMenu]);

    return (
        <MenuContext.Provider value={{ activeMenu, openMenu, closeMenu, isMenuOpen }}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
}

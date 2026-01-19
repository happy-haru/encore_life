export type InAppBrowserType = 'kakao' | 'other' | 'none';

/**
 * Detects if the current browser is a KakaoTalk in-app browser
 */
export function isKakaoInAppBrowser(): boolean {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent || navigator.vendor;
    return /KAKAOTALK/i.test(ua);
}

/**
 * Detects if the current browser is an in-app browser (KakaoTalk, Facebook, Instagram, etc.)
 * These browsers often have restrictions on OAuth flows
 */
export function isInAppBrowser(): boolean {
    if (typeof window === 'undefined') return false;

    const ua = navigator.userAgent || navigator.vendor;

    // Check for common in-app browsers
    const inAppBrowserPatterns = [
        /KAKAOTALK/i,           // KakaoTalk
        /FB_IAB/i,              // Facebook
        /FBAN/i,                // Facebook App
        /FBAV/i,                // Facebook App
        /Instagram/i,           // Instagram
        /Line/i,                // LINE
        /NAVER/i,               // Naver App
        /whale/i,               // Naver Whale (sometimes in-app)
    ];

    return inAppBrowserPatterns.some(pattern => pattern.test(ua));
}

/**
 * Returns the type of in-app browser being used
 */
export function getInAppBrowserType(): InAppBrowserType {
    if (typeof window === 'undefined') return 'none';

    if (isKakaoInAppBrowser()) {
        return 'kakao';
    }

    if (isInAppBrowser()) {
        return 'other';
    }

    return 'none';
}

/**
 * Checks if Kakao login can be used in the current browser
 */
export function canUseKakaoLogin(): boolean {
    const browserType = getInAppBrowserType();
    // Kakao login works in all browsers, including KakaoTalk in-app
    return true;
}

/**
 * Checks if Google login can be used in the current browser
 */
export function canUseGoogleLogin(): boolean {
    const browserType = getInAppBrowserType();
    // Google login is blocked in all in-app browsers
    return browserType === 'none';
}

/**
 * Opens the current URL in the device's default browser
 */
export function openInExternalBrowser() {
    if (typeof window === 'undefined') return;

    const currentUrl = window.location.href;

    // For iOS
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Try to open in Safari
        window.location.href = currentUrl;
    }
    // For Android
    else if (/Android/i.test(navigator.userAgent)) {
        // Intent to open in external browser
        const targetUrl = currentUrl.replace(/^https?:\/\//, '');
        window.location.href = `intent://${targetUrl}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;end`;
    }
    // Fallback
    else {
        window.open(currentUrl, '_blank');
    }
}

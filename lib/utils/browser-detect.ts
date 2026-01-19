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
        window.location.href = `intent://${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;end`;
    }
    // Fallback
    else {
        window.open(currentUrl, '_blank');
    }
}

import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Encore Life - 경험이 빛나는 새로운 시작',
        short_name: 'Encore Life',
        description: '40-65세+ 중장년층을 위한 맞춤 재취업 플랫폼',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
        ],
        categories: ['business', 'employment', 'productivity'],
        orientation: 'portrait',
    };
}

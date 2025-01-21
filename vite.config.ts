import { defineConfig, UserConfigFn } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
import { analyzer } from 'vite-bundle-analyzer';



const config: UserConfigFn = () => {
    const env = {
        _CLIENT_PORT: '3000',
        _APP_NAME: 'TimeNow',
        _AUTHOR_NAME: 'LesnoyPudge',
    };

    return defineConfig({
        base: '/app-time-now/',
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
        server: {
            port: Number.parseInt(env._CLIENT_PORT),
            watch: {
                ignored: ['**/generated/**'],
            },
        },
        preview: {
            port: Number.parseInt(env._CLIENT_PORT),
        },
        build: {
            outDir: 'build',
            emptyOutDir: true,
            // assetsInlineLimit: 0,
            copyPublicDir: true,
            rollupOptions: {
                treeshake: 'smallest',
            },
        },
        plugins: [
            react({
                babel: {
                    plugins: [
                        [
                            '@babel/plugin-transform-react-jsx',
                            { runtime: 'automatic' },
                        ],
                        'jsx-control-statements',
                    ],
                },
            }),
            tsconfigPaths(),
            checker({
                typescript: true,
                enableBuild: true,
                overlay: true,
                terminal: true,
            }),
            VitePWA({
                workbox: {
                    globPatterns: ['**/*'],
                },
                includeAssets: [
                    '**/*',
                ],
                registerType: 'autoUpdate',
                manifest: {
                    'short_name': env._APP_NAME,
                    'name': [
                        env._APP_NAME,
                        'by',
                        env._AUTHOR_NAME,
                    ].join(' '),
                    'icons': [
                        {
                            'src': '/android-chrome-192x192.png',
                            'sizes': '192x192',
                            'type': 'image/png',
                        },
                        {
                            'src': '/android-chrome-512x512.png',
                            'sizes': '512x512',
                            'type': 'image/png',
                        },
                    ],
                    'start_url': '.',
                    'display': 'standalone',
                    'theme_color': '#000000',
                    'background_color': '#000000',
                },
            }),
            // analyzer({ analyzerPort: 3_000 }),
        ],
    });
};

export default config;
import {defineConfig} from 'vitest/config';
import path from 'path';

export default defineConfig({
    server: {
        fs: {
            allow: ['..']
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        alias: {
            '@scripts': path.resolve(__dirname, '../scripts')
        },
    },
});

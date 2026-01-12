import { defineConfig } from 'vite';
import plugin from '@revideo/vite-plugin';

export default defineConfig({
    plugins: [
        plugin.default({
            project: './src/project.ts',
        }),
    ],
});

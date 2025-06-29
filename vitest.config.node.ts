/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		include: ['src/main/**/*.test.ts'],
		environment: 'node',
		alias: { '@main': resolve(__dirname, 'src/main') },
		setupFiles: resolve(__dirname, 'vitest.setup.ts'),
	},
});

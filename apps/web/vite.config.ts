import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	root: '.',
	build: {
		outDir: '../../dist/web',
		// sourcemap: true,
		// write: true,
		chunkSizeWarningLimit: 900,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		alias: {
			'@': './src',
		},
	},
	plugins: [react(), tsconfigPaths()],
});

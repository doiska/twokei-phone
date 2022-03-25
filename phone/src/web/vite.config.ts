import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	root: '.',
	build: {
		outDir: '../../dist/web',
	},
	plugins: [react(), tsconfigPaths()],
});
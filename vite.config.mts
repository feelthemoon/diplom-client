/* eslint-disable node/no-process-env */
import { fileURLToPath, URL } from 'node:url';

import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';

const createConfig = ({ mode }: { mode: string }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [
			vue(),
			svgLoader({
				svgoConfig: {
					plugins: [
						'cleanupAttrs',
						'cleanupEnableBackground',
						'cleanupListOfValues',
						'cleanupNumericValues',
						'collapseGroups',
						'convertColors',
						'convertPathData',
						'convertShapeToPath',
						'convertStyleToAttrs',
						'convertTransform',
						'mergePaths',
						'removeComments',
						'removeDesc',
						'removeDimensions',
						'removeDoctype',
						'removeEditorsNSData',
						'removeEmptyAttrs',
						'removeEmptyContainers',
						'removeEmptyText',
						'removeHiddenElems',
						'removeMetadata',
						'removeNonInheritableGroupAttrs',
						'removeRasterImages',
						'removeTitle',
						'removeUnknownsAndDefaults',
						'removeUselessDefs',
						'removeUnusedNS',
						'removeUselessStrokeAndFill',
						'removeXMLProcInst',
						'removeStyleElement',
						'sortAttrs',
					],
				},
			}),
			splitVendorChunkPlugin(),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		server: {
			port: process.env.VITE_APP_DEVSERVER_PORT ? parseInt(process.env.VITE_APP_DEVSERVER_PORT, 10) : 8081,
			proxy: {
				'^/api': {
					target: process.env.VITE_APP_PROXY_TARGET,
					changeOrigin: true,
				},
			},
		},
		build: {
			cssCodeSplit: true,
			sourcemap: mode === 'build' ? 'hidden' : false,
			rollupOptions: {
				treeshake: true,
				output: {
					compact: true,
					manualChunks(id: string) {
						if (id.includes('vue-router')) {
							return '@vue-router';
						}
						return undefined;
					},
				},
			},
			emptyOutDir: true,
		},
	});
};

export default createConfig;

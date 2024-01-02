import { sveltekit } from '@sveltejs/kit/vite';
import topLevelAwait from "vite-plugin-top-level-await";
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		topLevelAwait({
			// The export name of top-level await promise for each chunk module
			promiseExportName: "__tla",
			// The function to generate import names of top-level await promise in each chunk module
			promiseImportName: i => `__tla_${i}`
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		target: "es2019"
	}
});

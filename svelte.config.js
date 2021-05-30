import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig),
		sveltePreprocess({
			defaults: {
				style: 'postcss',
			},
			postcss: true,
		}),
	  ],

	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		
		// Comment the paths if wants to run in dev mode.
		// source : https://svelteland.github.io/svelte-kit-blog-demo/deply-to-github/
		paths: {
			base: '/ditheringJourney',
			assets: '/ditheringJourney'
		},
	},
};

export default config;
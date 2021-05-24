const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcssNested = require('postcss-nested');
const postcssCustomSelectors = require('postcss-custom-selectors');

const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
	plugins: [
		// Some plugins, like postcss-nested, need to run before Tailwind
		postcssNested,
		postcssCustomSelectors,
		tailwindcss,
		
		// But others, like autoprefixer, need to run after

		autoprefixer,
		
		!dev && cssnano({
			preset: "default",
		}),
	],
};

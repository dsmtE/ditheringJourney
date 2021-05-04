module.exports = {
	extensions: [".svx", ".md"],
	smartypants: {
		dashes: "oldschool",
	},
	remarkPlugins: [
		[require("remark-github"), {
			// Use your own repository
			repository: "https://github.com/svelte-add/mdsvex.git",
		}],
		require("remark-abbr"),
		require("remark-emoji"),
		require("remark-math"),
	],
	rehypePlugins: [
		require("rehype-slug"),
		[require("rehype-autolink-headings"), {
			behavior: "wrap",
		}],
		require("rehype-katex"),
	],
};

import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import remarkEmoji from 'remark-emoji';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatexSvelte from "rehype-katex-svelte";
import rehypeFigure from "rehype-figure";

export default {
	extensions: [".svx", ".md"],
	smartypants: {
		dashes: "oldschool",
	},
	remarkPlugins: [
		[remarkGithub, {
			repository: "https://github.com/dsmtE/ditheringJourney",
		}],
		remarkAbbr,
		remarkEmoji,
		remarkMath,
	],
	rehypePlugins: [
		rehypeKatexSvelte,
		rehypeSlug,
		[rehypeAutolinkHeadings, {
			behavior: "wrap",
		}],
		[rehypeFigure, { className: "figure" }]
	],
};

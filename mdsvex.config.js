import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import remarkEmoji from 'remark-emoji';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';

export default {
	extensions: [".svx", ".md"],
	smartypants: {
		dashes: "oldschool",
	},
	remarkPlugins: [
		[remarkGithub, {
			// Use your own repository
			repository: "https://github.com/dsmtE/ditheringJourney",
		}],
		remarkAbbr,
		remarkEmoji,
		remarkMath,
	],
	rehypePlugins: [
		rehypeSlug,
		[rehypeAutolinkHeadings, {
			behavior: "wrap",
		}],
		rehypeKatex,
	],
};

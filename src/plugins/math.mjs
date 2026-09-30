// Sätteri (mdast) plugin that renders `$inline$` and `$$block$$` math to HTML at
// build time with KaTeX. Needs `features.math` enabled in the Markdown processor
// and the KaTeX stylesheet on the page (see ArticlePost.astro).
import katex from 'katex';

const render = (value, displayMode) => ({
	// KaTeX output contains braces, so keep MDX from treating them as expressions.
	raw: katex.renderToString(value, { displayMode, throwOnError: false }),
	mdxExpressions: false,
});

export default {
	name: 'math',
	inlineMath: (node) => render(node.value, false),
	math: (node) => render(node.value, true),
};

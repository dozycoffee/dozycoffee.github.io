// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import callout from './src/plugins/remark-callout.mjs';
import math from './src/plugins/math.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://dozycoffee.github.io',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: { theme: 'github-light' },
		processor: satteri({
			features: { math: true },
			mdastPlugins: [callout, math],
		}),
	},
});

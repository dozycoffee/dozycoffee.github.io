import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';
import DefaultThumbnail from '../assets/default-thumbnail.webp';

export const GET: APIRoute = async () => {
	const posts = (
		await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft)
	).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	const index = await Promise.all(
		posts.map(async ({ id, data }) => ({
			url: `/blog/${id}/`,
			thumbnail: (
				await getImage({ src: data.heroImage ?? DefaultThumbnail, width: 240, height: 136 })
			).src,
			title: data.title,
			description: data.description,
			author: data.author,
			category: data.category,
			tags: data.tags,
		})),
	);

	return new Response(JSON.stringify(index), {
		headers: { 'Content-Type': 'application/json' },
	});
};
